const do_key = require("./key_funcs")
const { ipcRenderer } = require("electron")

const editor = document.getElementById("editor-root")
const colors = {
    light_blue: "#71a4f7",
    light_red: "#ff9bbe"
}

const keymap = {}
async function map_key(event) {
    keymap[event.key.toLowerCase()] = event.type == "keydown"
}

document.onkeyup = async (event) => { map_key(event) }
document.onkeydown = async (event) => {
    do_key(event)
    map_key(event)
}

async function set_handle_color(floating) {
    document.getElementById("floater-handle")
        .style.background = colors[floating ? "light_red" : "light_blue"]
}

async function draw_prompt(prefix) {
    prefix = prefix || ""
    document.getElementById("prompt")
        .style.display = "flex"
    document.getElementById("prompt-label")
        .children[0]
        .innerText = prefix
}

async function destroy_prompt() {
    document.getElementById("prompt")
        .style.display = "none"
    document.getElementById("prompt-label")
        .children[0]
        .innerText = document.getElementById("prompt-input")
        .innerText = ""
}

async function prepare_float() {
    let restore_data = {
        content: editor.value.toString()
    }
    ipcRenderer.send("float-ok", restore_data)
}

async function editor_state(event, restore_data) {
    editor.value = restore_data.content || ""
    set_handle_color(restore_data.floating)
}

// Should be called when the editor is about to toggle floating mode
// This actually closes and redraws the window, so the editor may need
// to do some cleanup and send some data over
ipcRenderer.on("float-prepare", prepare_float)
// Should be called when the main process wants the editor to load some state
ipcRenderer.on("editor-state", editor_state)

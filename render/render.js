const do_key = require("./key_funcs")
const { ipcRenderer } = require("electron")

const editor = document.getElementById("editor-root")

const keymap = {}
async function map_key(event) {
    keymap[event.key.toLowerCase()] = event.type == "keydown"
}

document.onkeyup = async (event) => { map_key(event) }
document.onkeydown = async (event) => {
    do_key(event)
    map_key(event)
}

async function prepare_float() {
    let restore_data = {
        content: editor.value.toString()
    }
    ipcRenderer.send("float-ok", restore_data)
}

async function editor_state(event, restore_data) {
    editor.value = restore_data.content || ""
}

// Should be called when the editor is about to toggle floating mode
// This actually closes and redraws the window, so the editor may need
// to do some cleanup and send some data over
ipcRenderer.on("float-prepare", prepare_float)
// Should be called when the main process wants the editor to load some state
ipcRenderer.on("editor-state", editor_state)

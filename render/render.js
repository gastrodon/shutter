const { do_key, map_key } = require("./key_funcs")
const ui = require("./interface_funcs")
const { ipcRenderer } = require("electron")

const editor = document.getElementById("editor-root")
const colors = {
    light_blue: "#71a4f7",
    light_red: "#ff9bbe"
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
    ui.set_handle_color(restore_data.floating)
}

// Should be called when the editor is about to toggle floating mode
// This actually closes and redraws the window, so the editor may need
// to do some cleanup and send some data over
ipcRenderer.on("float-prepare", prepare_float)
// Should be called when the main process wants the editor to load some state
ipcRenderer.on("editor-state", editor_state)

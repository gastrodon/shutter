const events = require("./lib/event_funcs")
const { do_key, map_key } = require("./lib/key_funcs")
const { ipcRenderer } = require("electron")

const colors = {
    light_blue: "#71a4f7",
    light_red: "#ff9bbe"
}


document.onkeyup = async (event) => { map_key(event) }
document.onkeydown = async (event) => {
    do_key(event)
    map_key(event)
}


// Should be called when the editor is about to toggle floating mode
// This actually closes and redraws the window, so the editor may need
// to do some cleanup and send some data over
ipcRenderer.on("float-prepare", events.prepare_float)
// Should be called when the main process wants the editor to load some state
ipcRenderer.on("editor-state", events.editor_state)

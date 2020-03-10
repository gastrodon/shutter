const events = require("./lib/event_funcs")
const key = require("./lib/key_funcs")
const $ = require("./lib/resolve")
const { ipcRenderer } = require("electron")

const colors = {
    light_blue: "#71a4f7",
    light_red: "#ff9bbe"
}


$("#editor-root").onkeyup = key.map_key
$("#editor-root").onkeydown = async (event) => {
    key.editor(event)
    key.map_key(event)
}

$("#prompt-input").onkeyup = async (event) => {
    key.update_prompt(event)
    key.map_key(event)
}

$("#prompt-input").onkeydown = async (event) => {
    key.prompt(event)
    key.update_prompt(event)
    key.map_key(event)
}

// Should be called when the editor is about to toggle floating mode
// This actually closes and redraws the window, so the editor may need
// to do some cleanup and send some data over
ipcRenderer.on("float-prepare", events.prepare_float)
// Should be called when the main process wants the editor to load some state
ipcRenderer.on("editor-state", events.editor_state)

ipcRenderer.on("load-text", events.load_text)

const do_key = require("./key_funcs")
const { ipcRenderer} = require("electron")

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
    ipcRenderer.send("float-ok", editor.value)
}

async function set_editor_content(content) {
    editor.value = content
}

ipcRenderer.once("float-prepare", prepare_float)
ipcRenderer.on("editor-content", set_editor_content)

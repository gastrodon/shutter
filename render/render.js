const do_key = require("./key_funcs")
const { ipcRenderer } = require("electron")
const keymap = {}

async function map_key(event) {
    keymap[event.key.toLowerCase()] = event.type == "keydown"
}

document.onkeyup = async (event) => { map_key(event) }
document.onkeydown = async (event) => {
    do_key(event)
    map_key(event)
}

const $ = require("./resolve")
const ui = require('./interface_funcs');

async function prepare_float() {
    let restore_data = {
        content: $("#editor-root").value.toString()
    }
    ipcRenderer.send("float-ok", restore_data)
}

async function editor_state(event, restore_data) {
    $("#editor-root").value = restore_data.content || ""
    ui.set_handle_color(restore_data.floating)
}

module.exports = {
    prepare_float,
    editor_state
}

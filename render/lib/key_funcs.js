const ui = require("./interface_funcs")
const $ = require("./resolve")

const EditorFuncs = {}
const PromptFuncs = {}
const keymap = {}
const TAB = "    "

async function map_key(event) {
    keymap[event.key.toLowerCase()] = event.type == "keydown"
}

EditorFuncs["tab"] = async (event) => {
    event.preventDefault()
    if (keymap["shift"]) {
        return
    }

    let where = event.target
    let start = where.selectionStart
    let text = where.value
    where.value = `${text.substring(0, start)}${TAB}${text.substring(start, text.length)}`
    where.selectionStart = where.selectionEnd = start + TAB.length
    where.focus()
}

EditorFuncs["o"] = async (event) => {
    if (!keymap["control"] || keymap["shift"]) {
        return
    }

    await ui.draw_prompt("open")
    $("#prompt-input").focus()
}

PromptFuncs["tab"] = async (event) => {
    event.preventDefault()
    $("#prompt-input").value = $("#prompt-input-overlay").innerText
}

PromptFuncs["escape"] = async (event) => {
    $("#editor-root").focus()
    ui.destroy_prompt()
}

async function do_key(event, target) {
    let callable = target[event.key.toLowerCase()]
    if (callable) {
        return callable(event)
    }
}

async function editor(event) {
    return await do_key(event, EditorFuncs)
}

async function prompt(event) {
    return await do_key(event, PromptFuncs)
}

async function update_prompt(event) {
    ui.prompt_overlay_text_after("")
}

module.exports = {
    prompt,
    editor,
    map_key,
    update_prompt
}

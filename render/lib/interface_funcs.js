const context = require('./context');
const $ = require("./resolve")

async function set_handle_color(floating) {
    let color = colors[floating ? "light_red" : "light_blue"]
    $("#floater-handle").style.background = color
}

async function draw_prompt(prefix) {
    prefix = prefix || ""
    context.set(prefix)

    $("#prompt").style.display = "flex"
    $("#prompt-label").innerText = prefix
}

async function destroy_prompt() {
    context.set("editor")

    $("#prompt").style.display = "none"
    $("#prompt-label").innerText = ""
    for (let child of $("#prompt-wrapped").children) {
        child.innerText = ""
        child.value = ""
    }
}

async function draw_popup(message, timeout, classname) {
    message = message || ""
    timeout = timeout || 3000

    let id = `err${Math.floor(Math.random() * 10000)}`
    let node = document.createElement("div")
    node.classList.add(classname)
    node.id = id
    node.innerText = message
    $("#message-box").appendChild(node)

    $(`#${id}`).onmousedown = async (event) => {
        event.currentTarget.remove()
    }

    setTimeout(async () => {
        let it = $(`#${id}`)
        if (it) {
            it.remove()
        }
    }, timeout);
}

async function draw_error(message, timeout) {
    return await draw_popup(message, timeout, "error-message")
}

async function draw_info(message, timeout) {
    return await draw_popup(message, timeout, "info-message")
}

async function prompt_overlay_text(text) {
    text = text || ""
    $("#prompt-input-overlay").innerText = text
}

async function prompt_overlay_text_after(text) {
    text = `${$("#prompt-input").value || ""}${text || ""}`
    return await prompt_overlay_text(text)

}

module.exports = {
    set_handle_color,

    draw_prompt,
    destroy_prompt,

    draw_error,
    draw_info,

    prompt_overlay_text,
    prompt_overlay_text_after
}

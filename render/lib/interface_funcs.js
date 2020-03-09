const $ = require("./resolve")

async function set_handle_color(floating) {
    let color = colors[floating ? "light_red" : "light_blue"]
    $("#floater-handle").style.background = color
}

async function draw_prompt(prefix) {
    prefix = prefix || ""
    $("#prompt").style.display = "flex"
    $("#prompt-label").innerText = prefix
}

async function destroy_prompt() {
    $("#prompt").style.display = "none"
    for (let child of $("#prompt").children) {
        child.innerText = ""
    }
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
    prompt_overlay_text,
    prompt_overlay_text_after
}

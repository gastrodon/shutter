async function set_handle_color(floating) {
    document.getElementById("floater-handle")
        .style.background = colors[floating ? "light_red" : "light_blue"]
}

async function draw_prompt(prefix) {
    prefix = prefix || ""
    document.getElementById("prompt")
        .style.display = "flex"
    document.getElementById("prompt-label")
        .children[0]
        .innerText = prefix
}

async function destroy_prompt() {
    document.getElementById("prompt")
        .style.display = "none"
    document.getElementById("prompt-label")
        .children[0]
        .innerText = document.getElementById("prompt-input")
        .innerText = ""
}

module.exports = {
    set_handle_color,
    draw_prompt,
    destroy_prompt
}

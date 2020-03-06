const TAB = "    "
const KeyFuncs = {}

KeyFuncs["tab"] = async (event) => {
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

async function do_key(event) {
    let callable = KeyFuncs[event.key.toLowerCase()]
    if (callable) {
        return callable(event)
    }
}

const keymap = {}
async function map_key(event) {
    keymap[event.key.toLowerCase()] = event.type == "keydown"
}

document.onkeyup = async (event) => { map_key(event) }
document.onkeydown = async (event) => {
    do_key(event)
    map_key(event)
}

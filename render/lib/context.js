const ContextFuncs = {
    editor: {},
    open: {},
}

ContextFuncs["open"]["enter"] = async (event) => {
    console.log("will open");
}

let _context = "editor"

function set(value) {
    if (value !== undefined && value != null) {
        _context = value
        if (!ContextFuncs[_context]) {
            ContextFuncs[_context] = {}
        }
    }

    return _context
}

// Context should always be the value of the prompt prefix,
// or "editor" if destroyed. This is set when draw_prompt and
// destroy_prompt are called
async function call(key, event) {
    callable = ContextFuncs[_context][key] || (async () => {})
    return await callable()
}

module.exports = {
    set,
    call
}

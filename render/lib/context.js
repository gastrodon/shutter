let _context = "editor"

function set(value) {
    if (value !== undefined && value != null) {
        _context = value
    }

    return _context
}
// Call the appropriate function for the
// current context value
async function call() {
    return
}

module.exports = {
    set,
    call
}

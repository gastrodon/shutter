function resolve(query) {
    switch (query.substring(0, 1)) {
        case ".":
            return document.getElementsByClassName(query.substring(1, query.length))
        case "#":
            return document.getElementById(query.substring(1, query.length))
        default:
            return document.getElementsByTagName(query)
    }
}

module.exports = resolve

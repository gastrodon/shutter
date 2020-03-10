const { app, BrowserWindow, ipcMain, globalShortcut } = require("electron")
const fs = require("fs").promises

let floating = false
let float_waiting = false

async function draw_root(floating, restore_data) {
    restore_data = {
        ...(restore_data || {}),
        ...{ floating: floating }
    }
    let root = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        height: 200,
        width: 300,
        frame: false,
        transparent: true,
        fullScreenable: !floating
    })

    if (floating) {
        root.setAlwaysOnTop(true, "floating", 1)
        root.setVisibleOnAllWorkspaces(true)
    }

    root.webContents.on("did-finish-load", async () => {
        root.webContents.send("editor-state", restore_data)
    })

    root.loadFile("./render/editor.html")
    return root
}

async function float_restart(event, content) {
    let active = BrowserWindow.getFocusedWindow()

    await draw_root(floating, content)
    await active.close()
}

async function float_prepare(event) {
    let active = BrowserWindow.getFocusedWindow()
    floating = !floating
    active.webContents.send("float-prepare")
}

async function open_disk(event, path) {
    let file = await fs.open(path)
    event.sender.webContents.send("load-text", await file.readFile({ encoding: "utf-8" }))
    file.close()
}

async function open_url(event, path) {
    event.sender.webContents.send("text", `I can't open ${path} yet :(`)
}

async function open_path(event, path) {
    console.log(`will open ${path}`);
    if (path.match(/^https?:\/\/.+/g)) {
        return await open_url(event, path)
    }

    return await open_disk(event, path)
}

function register_handlers() {
    let gs = globalShortcut
    gs.register("CmdOrCtrl+Shift+F", float_prepare)
}

app.on("ready", async () => {
    draw_root(floating)
    register_handlers()
})

// Spawned when the editor renderer
// tells us that it is ready to float
ipcMain.on("float-ok", float_restart)
// Spawned when the editor wants to open
// a document at some location
ipcMain.on("open-path", open_path)

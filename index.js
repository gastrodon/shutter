const { app, BrowserWindow, ipcMain, globalShortcut } = require("electron")
let floating = false
let float_waiting = false

async function draw_root(floating, restore_data) {
    let root = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        height: 200,
        width: 300,
        frame: false,
        fullScreenable: !floating
    })

    if (floating) {
        root.setAlwaysOnTop(true, "floating", 1)
        root.setVisibleOnAllWorkspaces(true)
    }

    root.webContents.on("did-finish-load", async () => {
        root.webContents.send("editor-state", restore_data || {})
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

function register_handlers() {
    let gs = globalShortcut
    gs.register("CmdOrCtrl+Shift+F", float_prepare)
}

app.on("ready", async () => {
    draw_root(floating)
    register_handlers()
})

ipcMain.on("float-ok", float_restart)

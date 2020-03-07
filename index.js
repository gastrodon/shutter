const { app, BrowserWindow, ipcMain, globalShortcut } = require("electron")
let floating = false
let float_waiting = false

async function draw_root(floating) {
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

    root.loadFile("./render/editor.html")
    return root
}

async function float_restart(content) {
    ipcMain.removeListener("float-ok", float_restart)

    let active = BrowserWindow.getFocusedWindow()

    let created = await draw_root(floating)
    await created.webContents.send("editor-content", content)
    await created.focus()

    await active.close()

}

async function float_prepare() {
    let active = BrowserWindow.getFocusedWindow()
    floating = !floating
    ipcMain.on("float-ok", float_restart)
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

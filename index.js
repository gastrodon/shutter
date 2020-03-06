const { app, BrowserWindow, ipcMain, globalShortcut } = require("electron")

function draw_root() {
    const root = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        height: 200,
        width: 300,
        frame: false,
    })
    root.loadFile("./render/editor.html")
}

async function float() {
    console.log("we floatin");
}

function register_handlers() {
    let gs = globalShortcut
    gs.register("CmdOrCtrl+Shift+F", float)
}

app.on("ready", async () => {
    draw_root()
    register_handlers()
})

const { app, BrowserWindow, ipcMain } = require("electron")

function draw_root() {
    const root = new BrowserWindow({
        height: 200,
        width: 300,
    })
    root.loadFile("./render/editor.html")
}

app.on("ready", async () => {
    draw_root()
})

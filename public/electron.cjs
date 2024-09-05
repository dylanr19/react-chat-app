const { app, BrowserWindow } = require('electron');
const path = require('path')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1024,
        height: 768,
        minWidth: 600,
        minHeight: 450,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    })

    //win.loadFile('index.html')
    win.loadURL('http://localhost:3000')
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
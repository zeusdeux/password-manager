const { app, BrowserWindow } = require('electron')
const { join } = require('path')
const { format } = require('url')

let win

function createWindow() {
  win = new BrowserWindow({ width: 800, height: 600 })

  win.loadURL(format({
    pathname: join(__dirname, '../views/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (!win) {
    createWindow()
  }
})

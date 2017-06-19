const d = require('debug')('src:index')
const { app, BrowserWindow, ipcMain } = require('electron')
const { join } = require('path')
const { format } = require('url')
const init = require('./model')

let win

function createWindow() {
  let db

  win = new BrowserWindow({ width: 1024, height: 720 })

  win.loadURL(format({
    pathname: join(__dirname, '../views/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  win.on('closed', () => {
    win = null
  })

  ipcMain.on('init', async (event, passphrase) => {
    try {
      d('Got init', passphrase)
      db = await init(passphrase)
      event.sender.send('init-response', null)
    } catch (error) {
      event.sender.send('init-response', error)
    }
  })

  ipcMain.on('db-op', async (event, {op, payload}) => {
    try {
      let response

      d('Got db-op', op, payload)
      switch (op) {
      case 'getAll':
        response = await db.getAll()
        break
      case 'get':
        response = await db.get(payload.id)
        break
      case 'search':
        response = await db.search()
        break
      case 'add':
        response = await db.add(payload.name, payload.username, payload.password)
        break
      case 'update':
        response = await db.update(payload.id, payload.name, payload.username, payload.password)
        break
      case 'remove':
        response = await db.remove(payload.id)
        break
      default: throw new Error(`${op} is not supported`)
      }
      event.sender.send('db-op-response', { op, response })
    } catch (error) {
      event.sender.send('db-op-response', { error })
    }
  })
}

const shouldQuit = app.makeSingleInstance((_argv, _workingDirectory) => {
  // Someone tried to run a second instance, we should focus our window.
  if (win) {
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

if (shouldQuit) {
  app.quit()
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

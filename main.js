const { app, ipcMain } = require('electron')
const { win, createWindow } = require('./mainWindow')

require('electron-reload')(__dirname)

ipcMain.on('new-item', (event, itemURL) => {
  const REPLY_DELAY = 2000
  const REPLY_MSG = `got new item: ${itemURL}`

  setTimeout(() => {
    event.sender.send('new-item-success', REPLY_MSG)
  }, REPLY_DELAY)

  console.log(REPLY_MSG)
})

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

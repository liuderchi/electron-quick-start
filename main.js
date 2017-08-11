const { app, ipcMain } = require('electron')
const { win, createWindow } = require('./mainWindow')
const readItem = require('./readItem')

require('electron-reload')(__dirname)

ipcMain.on('new-item', (event, itemURL) => {

  // get read item with readItem module
  readItem(itemURL, (item) => {
    event.sender.send('new-item-success', item)
  })
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

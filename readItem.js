const { BrowserWindow } = require('electron')
const URL = require('url')

// BrowserWindow
let bgItemWin = null

// export read item method
module.exports = (url, callback) => {

  // create new offscreen window
  bgItemWin = new BrowserWindow({
    width: 1000,
    height: 1000,
    show: false,
    webPreference: {
      offscreen: true
    },
  })

  // load read item
  bgItemWin.loadURL(URL.format({
    pathname: url,
    protocol: 'http:',
    slashes: true,
  }))

  bgItemWin.webContents.on('did-finish-load', () => {

    // get thumbnail
    bgItemWin.webContents.capturePage((image) => {

      // get image, title
      const [screenshot, title] = [image.toDataURL(), bgItemWin.getTitle()]

      callback({ title, screenshot, url })

      // cleanup
      bgItemWin.close()
      bgItemWin = null
    })
  })
}

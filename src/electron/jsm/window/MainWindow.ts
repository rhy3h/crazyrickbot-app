import path from 'path'

import {
  BrowserWindow
} from 'electron'

class MainWindow extends BrowserWindow {
  constructor () {
    super({
      width: 800,
      height: 600,
      show: false,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    })

    // and load the index.html of the app.
    if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
      this.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL)
    } else {
      this.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`))
    }

    this.once('ready-to-show', () => {
      this.show()

      this.webContents.openDevTools()
    })
  }
}

export { MainWindow }

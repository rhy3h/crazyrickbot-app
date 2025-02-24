import { app, BrowserWindow } from 'electron'
import path from 'node:path'
import fs from 'node:fs'
import started from 'electron-squirrel-startup'
import { updateElectronApp, UpdateSourceType } from 'update-electron-app'
import Logger from 'electron-log'

import { Store } from '@/electron/jsm/electron/Store'

import { TwitchLoginWindow } from './jsm/window/TwitchLoginWindow'
import { MainWindow } from '@/electron/jsm/window/MainWindow'

import { StoreIpcMain } from '@/electron/ipcMain/storeIpcMain'
import { TwitchAPIIpcMain } from '@/electron/ipcMain/twitchAPIIpcMain'

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit()
}

updateElectronApp({
  updateSource: {
    type: UpdateSourceType.ElectronPublicUpdateService,
    repo: 'rhy3h/crazyrickbot-app'
  },
  logger: Logger
})

function createStore () {
  let store: Store

  try {
    store = new Store()
  } catch {
    const configFilePath = path.resolve(path.join(app.getPath('userData'), 'config.json'))
    fs.unlinkSync(configFilePath)
    store = new Store()
  }

  return store
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new MainWindow()

  const store: Store = createStore()

  new StoreIpcMain(mainWindow, store)
  new TwitchAPIIpcMain(mainWindow, store)

  if (!store.getTwitchAccessToken()) {
    const onLogin = (code: string) => {
      store.setTwitchAccessToken(code)
    }
    new TwitchLoginWindow(onLogin)
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

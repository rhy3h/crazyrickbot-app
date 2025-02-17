import {
  BrowserWindow,
  ipcMain
} from 'electron'

import { Store } from '@/electron/jsm/electron/Store'
import { STORE_TWITCH_GET_ACCESS_TOKEN } from '@/electron/ipc/mainProcess/storeIPC'

export class StoreIpcMain {
  constructor (mainWindow: BrowserWindow, store: Store) {
    ipcMain.handle(STORE_TWITCH_GET_ACCESS_TOKEN, async (_event) => {
      const code = store.getTwitchAccessToken()

      return code
    })
  }
}

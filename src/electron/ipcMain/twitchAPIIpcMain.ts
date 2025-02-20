import {
  BrowserWindow,
  ipcMain
} from 'electron'

import { StaticAuthProvider } from '@twurple/auth'
import { ApiClient } from '@twurple/api'

import { Store } from '@/electron/jsm/electron/Store'
import { TWITCH_API_GET_USER_BY_NAME } from '@/electron/ipc/mainProcess/twitchAPIIPC'

export class TwitchAPIIpcMain {
  constructor (mainWindow: BrowserWindow, store: Store) {
    const clientId = 'zlnt66wcdf2xnj0sceyq81qt890ddo'
    const accessToken = store.getTwitchAccessToken()

    const authProvider = new StaticAuthProvider(clientId, accessToken)

    const apiClient = new ApiClient({ authProvider })

    ipcMain.handle(TWITCH_API_GET_USER_BY_NAME, async (_event, userName: string) => {
      const helixUser = await apiClient.users.getUserByName(userName)
      if (!helixUser) {
        return null
      }

      const { id, name, displayName, description, profilePictureUrl } = helixUser
      const result: TwitchUser = {
        id,
        name,
        displayName,
        description,
        profilePictureUrl
      }

      return result
    })
  }
}

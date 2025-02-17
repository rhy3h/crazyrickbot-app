import { ipcRenderer } from 'electron'

export const STORE_TWITCH_GET_ACCESS_TOKEN = 'store_twitch_get_access_token'

export const storeIPC: StoreIPC = {
  twitch: {
    getAccessToken: () => ipcRenderer.invoke(STORE_TWITCH_GET_ACCESS_TOKEN)
  }
}

import { ipcRenderer } from 'electron'

export const TWITCH_API_GET_USER_BY_NAME = 'TWITCH_API_GET_USER_BY_NAME'

export const twitchAPIIPC: TwitchAPIIPC = {
  getUserByName: (userName: string) => ipcRenderer.invoke(TWITCH_API_GET_USER_BY_NAME, userName)
}

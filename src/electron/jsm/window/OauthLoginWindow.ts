import { BrowserWindow } from 'electron'

const OAUTH_BASE_URL = 'https://crazyrickbot.vercel.app/'

class OauthLoginWindow extends BrowserWindow {
  constructor (url: string, getToken: boolean, onLogin: (code: string) => void) {
    super({ show: false })

    this.once('ready-to-show', () => {
      this.show()
    })
    this.setMenuBarVisibility(false)

    this.loadURL(url)

    this.webContents.on('will-navigate', (event, url) => {
      let code = ''

      const uri = getToken ? 'access_token=' : 'code='
      let codeIdx = url.indexOf(uri)
      if (codeIdx === -1) return

      if (!url.startsWith(OAUTH_BASE_URL)) return

      codeIdx += uri.length

      const nextIdx = url.indexOf('&', codeIdx)
      if (nextIdx > -1) {
        code = url.slice(codeIdx, nextIdx)
      } else {
        code = url.slice(codeIdx)
      }

      onLogin(code)
      this.close()
    })
  }
}

export { OAUTH_BASE_URL, OauthLoginWindow }

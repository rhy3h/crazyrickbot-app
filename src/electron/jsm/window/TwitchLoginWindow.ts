import { OAUTH_BASE_URL, OauthLoginWindow } from './OauthLoginWindow'

const TWITCH_AUTH_URL = OAUTH_BASE_URL + 'v1/twitch/auth'

class TwitchLoginWindow extends OauthLoginWindow {
  constructor (onLogin: (code: string) => void) {
    super(TWITCH_AUTH_URL, true, onLogin)

    this.setSize(700 - 32, 700)
  }
}

export { TwitchLoginWindow }

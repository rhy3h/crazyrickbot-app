import ElectronStore, { Schema } from 'electron-store'
import { encryptString, decryptString } from '@/electron/jsm/electron/crypt'

const schema: Schema<IStore> = {
  twitch: {
    type: 'object',
    properties: {
      accessToken: {
        type: 'string',
        default: ''
      }
    },
    default: {},
    required: ['accessToken']
  }
}

class Store extends ElectronStore <IStore> {
  constructor () {
    super({
      schema
    })
  }

  setTwitchAccessToken (accessToken: string) {
    accessToken = encryptString(accessToken)

    this.set('twitch', {
      accessToken
    })
  }

  getTwitchAccessToken () {
    const twitch: Twitch = this.get('twitch')

    const accessToken = decryptString(twitch.accessToken)

    return accessToken
  }
}

export { Store }

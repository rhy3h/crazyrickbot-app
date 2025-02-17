import ElectronStore, { Schema } from 'electron-store'

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
    this.set('twitch', {
      accessToken
    })

    if (accessToken !== this.getTwitchAccessToken()) {
      throw new Error('Set Twitch Access Token Failed')
    }
  }

  getTwitchAccessToken () {
    const twitch: Twitch = this.get('twitch')

    return twitch.accessToken
  }
}

export { Store }

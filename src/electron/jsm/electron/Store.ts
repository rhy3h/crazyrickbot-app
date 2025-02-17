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
}

export { Store }

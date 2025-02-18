import { StaticAuthProvider } from '@twurple/auth'
import { ApiClient } from '@twurple/api'
import { EventSubWsListener } from '@twurple/eventsub-ws'

class TwitchEventSub {
  constructor (clientId: string, accessToken: string) {
    this.setup(clientId, accessToken)
  }

  async setup (clientId: string, accessToken: string) {
    const authProvider = new StaticAuthProvider(clientId, accessToken)

    const apiClient = new ApiClient({ authProvider })

    await apiClient.eventSub.deleteBrokenSubscriptions()

    const listener = new EventSubWsListener({ apiClient })
    listener.start()
  }
}

export { TwitchEventSub }

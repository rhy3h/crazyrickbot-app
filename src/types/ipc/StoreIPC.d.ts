interface StoreIPC {
  twitch: {
    getAccessToken: () => Promise<string>;
  }
}

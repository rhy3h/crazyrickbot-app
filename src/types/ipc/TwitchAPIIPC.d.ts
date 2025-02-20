interface TwitchUser {
  id: string;
  name: string;
  displayName: string;
  description: string;
  profilePictureUrl: string;
}

interface TwitchAPIIPC {
  getUserByName: (userName: string) => Promise<TwitchUser>;
}

export interface DiscordTokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
}

export interface DiscordUserInfo {
  user: {
    id: string;
    username: string;
    global_name: string | null;
    display_name: string | null;
    avatar: string;
    discriminator: string;
    public_flags: number;
    avatar_decoration: string;
  };
}

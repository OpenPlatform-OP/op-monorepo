import DiscordOAuthConfig from '@/interfaces/discordOAuthConfig';

const getDiscordOAuthConfig = (): DiscordOAuthConfig => {
  return {
    clientId: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    redirectUri: process.env.DISCORD_REDIRECT_URI,
  };
};

export default getDiscordOAuthConfig;

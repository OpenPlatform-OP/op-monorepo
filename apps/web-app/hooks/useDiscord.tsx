import DiscordOAuthConfig from '@/interfaces/discordOAuthConfig';
import DiscordOAuth from 'discord-oauth2';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

const useDiscord = (config: DiscordOAuthConfig) => {
  const { push } = useRouter();
  const oauth = useMemo(
    () =>
      new DiscordOAuth({
        clientId: config.clientId,
        clientSecret: config.clientSecret,
        redirectUri: config.redirectUri,
      }),
    [config]
  );

  const login = useMemo(
    () => () => {
      const authUrl = oauth.generateAuthUrl({
        scope: ['guilds'],
      });
      push(authUrl);
    },
    [oauth, push]
  );

  const getAccessToken = useMemo(
    () => async (code: string) => {
      const { access_token } = await oauth.tokenRequest({
        code: code as string,
        scope: 'guilds',
        grantType: 'authorization_code',
      });
      return access_token;
    },
    [oauth]
  );

  return {
    login,
    getAccessToken,
  };
};

export default useDiscord;

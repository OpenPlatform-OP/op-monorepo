import { requestWrapper } from '../request';

export const getDiscordOAuthEndpoint = () => {
  return requestWrapper<string>(
    {
      url: '/api/internal/auth/discord',
      method: 'GET',
    },
    {
      isPublic: true,
    }
  );
};

import { useRouter } from 'next/router';

import { getDiscordOAuthEndpoint } from '@/requests/auth/discord';
import useRequest from './useRequest';

const useDiscord = () => {
  const { fetch } = useRequest();
  const { push } = useRouter();

  const getOAuthEndpoint = async () => {
    const url = await fetch(getDiscordOAuthEndpoint());
    push(url);
  };

  return {
    getDiscordOAuthEndpoint: getOAuthEndpoint,
  };
};

export default useDiscord;

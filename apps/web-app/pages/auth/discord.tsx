import { NextPageWithProps } from '../_app';
import useDiscord from '@/hooks/useDiscord';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';

import { Spinner } from '@base-ui';
import getDiscordOAuthConfig from '@/utils/discord';
import DiscordOAuthConfig from '@/interfaces/discordOAuthConfig';
import { GetServerSidePropsResult } from 'next';
import useCookie from '@/hooks/useCookie';

type ServerSideProps = {
  discordOAuthConfig: DiscordOAuthConfig;
};

const Discord: NextPageWithProps<ServerSideProps> = ({
  discordOAuthConfig,
}) => {
  const {
    query: { code },
    push,
    isReady,
  } = useRouter();

  const { getAccessToken } = useDiscord(discordOAuthConfig);
  const { token: tokeOpt } = useCookie();

  useEffect(() => {
    if (!isReady) return;

    (async function () {
      if (code) {
        tokeOpt.set(await getAccessToken(code as string));
      } else {
        // TODO: Invalid code display
        alert('Invalid Code!');
      }
      push('/');
    })();
  }, [isReady, code, getAccessToken, push, tokeOpt]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Spinner />
    </Box>
  );
};

Discord.getMainLayout = (page: ReactElement) => page;

export const getServerSideProps =
  (): GetServerSidePropsResult<ServerSideProps> => {
    return {
      props: {
        discordOAuthConfig: getDiscordOAuthConfig(),
      },
    };
  };

export default Discord;

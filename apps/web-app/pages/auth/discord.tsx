import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';

import { Spinner } from '@base-ui';
import useAuth from '@/hooks/useAuth';
import useAuthCtx from '@/hooks/context/useAuth';
import { LoginType } from '@model';

const Discord = () => {
  const { signIn } = useAuth();
  const { setJwtToken } = useAuthCtx();
  const {
    query: { code, state },
    push,
  } = useRouter();

  useEffect(() => {
    (async function () {
      if (code && state) {
        const token = await signIn({
          code: code as string,
          state: state as string,
          loginType: LoginType.DISCORD,
        });
        setJwtToken(token);
        push('/');
      }
    })();
  }, [code, state]);

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

export default Discord;

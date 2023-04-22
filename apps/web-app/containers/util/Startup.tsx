import useAuth from '@/hooks/useAuth';
import useAuthCtx from '@/hooks/context/useAuth';
import useCookie from '@/hooks/useCookie';
import { FC, ReactNode, useEffect } from 'react';

type Props = {
  children: ReactNode;
};

const Startup: FC<Props> = ({ children }) => {
  const { token } = useCookie();
  const { authentication, getCurrentUserInfo } = useAuth();
  const { setJwtToken, setUserInfo, jwtToken } = useAuthCtx();

  useEffect(() => {
    (async function () {
      const jwtToken = token.get();
      if (jwtToken) {
        const token = await authentication(jwtToken);
        setJwtToken(token);
      }
    })();
  }, []);

  useEffect(() => {
    (async function () {
      if (jwtToken) {
        const userInfoData = await getCurrentUserInfo();
        token.set(jwtToken);
        setUserInfo(userInfoData);
      } else if (jwtToken === null) {
        token.remove();
        setUserInfo(null);
      }
    })();
  }, [jwtToken]);

  return <>{children}</>;
};

export default Startup;

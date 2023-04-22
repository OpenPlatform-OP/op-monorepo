import { FC, ReactNode, useState } from 'react';
import AuthContext from '@/contexts/AuthContext';
import { UserInfo } from '@model';

type Props = {
  children: ReactNode;
};

const AuthProvider: FC<Props> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [jwtToken, setJwtToken] = useState<string | null>();

  return (
    <AuthContext.Provider
      value={{
        jwtToken,
        setJwtToken: (token: string) => setJwtToken((_) => token),
        userInfo,
        setUserInfo: (userInfo: UserInfo) => setUserInfo((_) => userInfo),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

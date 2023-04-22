import { UserInfo } from '@model';
import { createContext } from 'react';

interface IAuthContext {
  jwtToken: string | null;
  setJwtToken: (token: string) => unknown;
  userInfo: UserInfo | null;
  setUserInfo: (userInfo: UserInfo) => unknown;
}

const AuthContext = createContext<IAuthContext>({
  jwtToken: null,
  setJwtToken: () => null,
  userInfo: null,
  setUserInfo: () => null,
});

export default AuthContext;

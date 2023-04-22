import {
  signIn as signInRequest,
  authentication as authenticationRequest,
  getCurrentUser as getCurrentUserRequest,
} from '@/requests/auth/auth';
import { LoginReq } from '@model';
import useRequest from './useRequest';
import useAuthCtx from '@/hooks/context/useAuth';

const useAuth = () => {
  const { fetch } = useRequest();
  const { setJwtToken } = useAuthCtx();

  const signIn = (data: LoginReq) => {
    return fetch(signInRequest(data));
  };

  const authentication = (token: string) => {
    return fetch(authenticationRequest(token));
  };

  const getCurrentUserInfo = () => {
    return fetch(getCurrentUserRequest());
  };

  const signOut = () => {
    setJwtToken(null);
  };

  return {
    signIn,
    authentication,
    signOut,
    getCurrentUserInfo,
  };
};

export default useAuth;

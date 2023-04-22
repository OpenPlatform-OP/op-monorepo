import { requestWrapper } from '../request';
import { LoginReq, UserInfo } from '@model';

export const signIn = (data: LoginReq) => {
  return requestWrapper<string>(
    {
      url: '/api/internal/auth/login',
      method: 'POST',
      data,
    },
    {
      isPublic: true,
    }
  );
};

export const authentication = (token: string) => {
  return requestWrapper<string>({
    url: '/api/internal/auth',
    method: 'POST',
    data: { token },
  });
};

export const getCurrentUser = () => {
  return requestWrapper<UserInfo>({
    url: '/api/internal/auth/login/user',
    method: 'GET',
  });
};

export enum LoginType {
  DISCORD = 'DISCORD',
}

export interface LoginReq {
  code: string;
  state: string;
  loginType: LoginType;
}

export interface AuthenticationReq {
  token: string;
}

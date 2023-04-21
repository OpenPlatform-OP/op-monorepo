import { LoginType } from '@model';

export interface ThirdPartyUserInfo {
  uid: string;
  userName: string;
  avatar: string;
  loginType: LoginType;
}

export interface JwtInfo extends ThirdPartyUserInfo {
  thirdPartyUid: string;
}

export interface JwtFullData extends JwtInfo {
  iat: number;
  exp: number;
  iss: string;
}

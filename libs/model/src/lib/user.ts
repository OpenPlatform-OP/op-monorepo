import { LoginType } from './auth';

export interface UserInfo {
  uid: string;
  userName: string;
  avatar: string;
  loginType: LoginType;
  thirdPartyUid: string;
}

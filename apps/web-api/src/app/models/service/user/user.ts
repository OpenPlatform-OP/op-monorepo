import { LoginType } from '@model';

export interface UserInfo {
  uid?: string;
  name: string;
  avatar?: string;
  loginType: LoginType;
  thirdPartyUid: string;
}

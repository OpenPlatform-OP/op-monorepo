import { Injectable } from '@nestjs/common';
import { Observable, concatMap, from, of } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../user.service';
import {
  JwtFullData,
  JwtInfo,
  ThirdPartyUserInfo,
} from '../../models/service/auth/jwt';
import { UserInfo } from '../../models/service/user/user';

@Injectable()
export class AuthService {
  private readonly jwt_expiration: string = '7d';
  private readonly jwt_issuer: string = 'OpenPlatform-Core';

  constructor(
    private readonly _jwt: JwtService,
    private readonly _user: UserService
  ) {}

  signIn(thirdPartyInfo: ThirdPartyUserInfo): Observable<string> {
    const { uid, loginType, userName, avatar } = thirdPartyInfo;
    return this._user.getUser({ thirdPartyUid: uid, loginType }).pipe(
      concatMap((user) => {
        if (user) {
          return this.createJwtToken(this.toJwtInfoModel(user));
        } else {
          return this._user
            .createUser({
              name: userName,
              avatar,
              loginType,
              thirdPartyUid: uid,
            })
            .pipe(
              concatMap((user) =>
                this.createJwtToken(this.toJwtInfoModel(user))
              )
            );
        }
      })
    );
  }

  authentication(jwtToken: string): Observable<string> {
    return this.verifyJwtToken(jwtToken).pipe(
      concatMap((jwtData) => this.signIn(jwtData as ThirdPartyUserInfo))
    );
  }

  createJwtToken(data: JwtInfo): Observable<string> {
    return from(
      this._jwt.signAsync(data, {
        algorithm: 'HS256',
        issuer: this.jwt_issuer,
        expiresIn: this.jwt_expiration,
      })
    );
  }

  verifyJwtToken(token: string): Observable<JwtFullData> {
    return from(
      this._jwt.verifyAsync<JwtFullData>(token, {
        algorithms: ['HS256'],
      })
    );
  }

  private toJwtInfoModel(data: UserInfo): JwtInfo {
    return {
      uid: data.uid.toString(),
      userName: data.name,
      avatar: data.avatar,
      loginType: data.loginType,
      thirdPartyUid: data.thirdPartyUid,
    };
  }
}

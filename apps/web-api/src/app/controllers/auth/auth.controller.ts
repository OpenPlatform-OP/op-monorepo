import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UnauthorizedException,
  Headers,
} from '@nestjs/common';
import { concatMap, of, throwError, catchError, Observable } from 'rxjs';

import { DiscordService } from '../../services/auth/discord.service';
import { AuthenticationReq, LoginReq, LoginType, UserInfo } from '@model';
import { AuthService } from '../../services/auth/auth.service';
import { JwtFullData, JwtInfo } from '../../models/service/auth/jwt';
import { UserService } from '../../services/user.service';
import { UserInfo as SV_User } from '../../models/service/user/user';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly _discord: DiscordService,
    private readonly _auth: AuthService,
    private readonly _user: UserService
  ) {}

  @Get('/discord')
  getDiscordLoginUri(): Observable<string> {
    return this._discord.getOAuthEndpoint().pipe(
      concatMap((uri) => {
        return uri
          ? of(uri)
          : throwError(
              () =>
                new BadRequestException('Get discord authorize endpoint error!')
            );
      })
    );
  }

  @Post('login')
  login(@Body() body: LoginReq): Observable<string> {
    return of(body).pipe(
      concatMap((data) => {
        return data.loginType === LoginType.DISCORD
          ? this._discord.signIn(body.code)
          : throwError(() => new Error('Invalid Third-Party agent!'));
      }),
      concatMap((jwtInfo) => {
        return jwtInfo
          ? this._auth.signIn(jwtInfo)
          : throwError(() => new Error('Line authentication error!'));
      }),
      catchError((error: Error) => {
        return throwError(() => new BadRequestException(error.message));
      })
    );
  }

  @Post()
  authentication(@Body() body: AuthenticationReq): Observable<string> {
    return this._auth.verifyJwtToken(body.token).pipe(
      concatMap((jwtData) => {
        return jwtData
          ? this._auth.createJwtToken(this.toJwtInfoModel(jwtData))
          : throwError(() => new Error('Invalid token!'));
      }),
      catchError((error: Error) =>
        throwError(() => new UnauthorizedException(error.message))
      )
    );
  }

  @Get('/login/user')
  getUser(@Headers('Authorization') auth: string): Observable<UserInfo> {
    return this._auth.verifyJwtToken(auth.split(' ')[1]).pipe(
      concatMap((jwtData) => {
        return jwtData
          ? this._user.getUserById(jwtData.uid)
          : throwError(() => new Error('Invalid token!'));
      }),
      concatMap((userInfo) => {
        return userInfo
          ? of(this.toUserViewModel(userInfo))
          : throwError(() => new Error('Invalid user!'));
      }),
      catchError((error: Error) =>
        throwError(() => new UnauthorizedException(error.message))
      )
    );
  }

  private toUserViewModel(data: SV_User): UserInfo {
    return {
      uid: data.uid,
      userName: data.name,
      avatar: data.avatar,
      loginType: data.loginType,
      thirdPartyUid: data.thirdPartyUid,
    };
  }

  private toJwtInfoModel(data: JwtFullData): JwtInfo {
    return {
      uid: data.uid,
      userName: data.userName,
      avatar: data.avatar,
      loginType: data.loginType,
      thirdPartyUid: data.thirdPartyUid,
    };
  }
}

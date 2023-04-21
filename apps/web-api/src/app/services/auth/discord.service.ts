import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { of, map, Observable, concatMap } from 'rxjs';
import { HttpService } from '@nestjs/axios';

import { AppConfig } from '../config.service';
import {
  DiscordTokenResponse,
  DiscordUserInfo,
} from '../../models/service/auth/discord';
import { ThirdPartyUserInfo } from '../../models/service/auth/jwt';
import { LoginType } from '@model';

const DISCORD_OAUTH_URI = 'https://discord.com/api/oauth2';
const REQUEST_CONTENT_TYPE = 'application/x-www-form-urlencoded';

@Injectable()
export class DiscordService {
  private readonly clientId: string;
  private readonly clientSecret: string;
  private readonly redirectUri: string;
  private readonly scope: string[] = ['guilds.join', 'identify', 'email'];

  constructor(
    private readonly _config: AppConfig,
    private readonly _http: HttpService
  ) {
    const config = this._config.getConfig();
    this.clientId = config.discord_oauth_client_id;
    this.clientSecret = config.discord_oauth_client_secret;
    this.redirectUri = config.discord_oauth_redirect_uri;
  }

  getOAuthEndpoint(): Observable<string> {
    const queryStrings: { key: string; value: string }[] = [
      { key: 'client_id', value: this.clientId },
      {
        key: 'redirect_uri',
        value: this.redirectUri,
      },
      { key: 'response_type', value: 'code' },
      { key: 'scope', value: this.scope.join('%20') },
      { key: 'state', value: uuid() },
    ];

    return of(queryStrings).pipe(
      map(
        (queries) =>
          `${DISCORD_OAUTH_URI}/authorize?${queries
            .map((e) => `${e.key}=${e.value}`)
            .join('&')}`
      )
    );
  }

  signIn(code: string): Observable<ThirdPartyUserInfo> {
    return this.getToken(code).pipe(
      concatMap((token) => this.getUserProfile(token.access_token)),
      map(
        (data) =>
          data &&
          ({
            uid: data.user.id,
            userName: data.user.username,
            avatar: data.user.avatar,
            loginType: LoginType.DISCORD,
          } as ThirdPartyUserInfo)
      )
    );
  }

  getToken(code: string): Observable<DiscordTokenResponse> {
    return this._http
      .request<DiscordTokenResponse>({
        url: `${DISCORD_OAUTH_URI}/token`,
        method: 'POST',
        headers: {
          'Content-Type': REQUEST_CONTENT_TYPE,
        },
        data: {
          client_id: this.clientId,
          client_secret: this.clientSecret,
          grant_type: 'authorization_code',
          code,
          redirect_uri: this.redirectUri,
        },
      })
      .pipe(map((res) => res.data));
  }

  getUserProfile(accessToken: string): Observable<DiscordUserInfo> {
    return this._http
      .request<DiscordUserInfo>({
        url: `${DISCORD_OAUTH_URI}/@me`,
        method: 'Get',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .pipe(map((res) => res.data));
  }
}

import { ConfigKey } from './../configuration';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly _config: ConfigService) {}

  getEnv(): string {
    return this._config.get<string>(ConfigKey.ENV);
  }
}

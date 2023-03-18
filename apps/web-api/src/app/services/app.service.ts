import { Injectable } from '@nestjs/common';
import { Env } from '../enums/env.enum';

import { AppConfig } from './config.service';

@Injectable()
export class AppService {
  constructor(private readonly _config: AppConfig) {}

  getData(): { message: string } {
    return { message: 'Welcome to web-api!' };
  }

  getEnvName(): Env {
    return this._config.getConfig().env;
  }
}

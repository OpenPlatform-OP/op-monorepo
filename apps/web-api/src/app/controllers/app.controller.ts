import { Controller, Get } from '@nestjs/common';

import { AppService } from '../services/app.service';

@Controller()
export class AppController {
  constructor(private readonly _app: AppService) {}

  @Get()
  getEnv() {
    return { Env: this._app.getEnv() };
  }

  @Get()
  getTestData(): string {
    return 'test';
  }
}

import { Controller, Get } from '@nestjs/common';
import { AppService } from './../services/app.service';

@Controller()
export class AppController {
  constructor(private readonly _app: AppService) {}

  @Get()
  getData() {
    return this._app.getData();
  }

  @Get('/env')
  getEnvName() {
    return this._app.getEnvName();
  }
}

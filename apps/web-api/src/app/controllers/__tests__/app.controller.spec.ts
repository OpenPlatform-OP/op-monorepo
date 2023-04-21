import { AppConfig } from '../../services/config.service';
import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from '../app.controller';
import { AppService } from '../../services/app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from '../../configuration';
import { Env } from '../../enums/env.enum';

describe('AppController', () => {
  let _app: TestingModule;

  beforeAll(async () => {
    _app = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [configuration],
        }),
      ],
      controllers: [AppController],
      providers: [AppService, AppConfig],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Welcome to web-api!"', () => {
      const appController = _app.get<AppController>(AppController);
      expect(appController.getData()).toEqual({
        message: 'Welcome to web-api!',
      });
    });
  });

  describe('getEnvName', () => {
    it('should return Env name', () => {
      const appController = _app.get<AppController>(AppController);
      expect(Object.values(Env)).toContain(appController.getEnvName());
    });
  });
});

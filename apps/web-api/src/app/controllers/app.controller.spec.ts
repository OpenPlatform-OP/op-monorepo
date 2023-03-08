import { environment } from './../../environments/environment';
import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AppService } from '../services/app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from '../configuration';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [configuration],
        }),
      ],
      controllers: [AppController],
      providers: [AppService],
    }).compile();
  });

  describe('get env', () => {
    it('should return Env name', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.getEnv()).toEqual({ Env: environment.env });
    });
  });

  it('should return test data', () => {
    const appController = app.get<AppController>(AppController);
    expect(appController.getTestData()).toBe('test');
  });
});

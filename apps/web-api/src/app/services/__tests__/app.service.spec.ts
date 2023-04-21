import { AppConfig } from '../config.service';
import { Test } from '@nestjs/testing';
import { AppService } from '../app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from '../../configuration';
import { Env } from '../../enums/env.enum';

describe('AppService', () => {
  let service: AppService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [configuration],
        }),
      ],
      providers: [AppConfig, AppService],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  describe('getData', () => {
    it('should return "Welcome to web-api!"', () => {
      expect(service.getData()).toEqual({ message: 'Welcome to web-api!' });
    });
  });

  describe('getEnvName', () => {
    it('should return Env name', () => {
      expect(Object.values(Env)).toContain(service.getEnvName());
    });
  });
});

import { AppConfig } from '../config.service';
import { Test } from '@nestjs/testing';
import { AppService } from '../app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from '../../configuration';
import { Env } from '../../enums/env.enum';

describe('AppConfig', () => {
  let config: AppConfig;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [configuration],
        }),
      ],
      providers: [AppConfig, AppService],
    }).compile();

    config = app.get<AppConfig>(AppConfig);
  });

  describe('getConfig', () => {
    it('should return env config', () => {
      const configData = config.getConfig();
      expect(Object.values(Env)).toContain(configData.env);
      expect(configData.port).toBeTruthy();
    });
  });
});

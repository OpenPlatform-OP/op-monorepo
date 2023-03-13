import { environment } from './../../environments/environment';
import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import configuration from '../configuration';

import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [configuration],
        }),
      ],
      providers: [AppService],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  describe('get env', () => {
    it('should return Env name', () => {
      expect(service.getEnv()).toEqual(environment.env);
    });
  });
});

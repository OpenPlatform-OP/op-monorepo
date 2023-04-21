import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth.module';
import { UserModule } from './user.module';
import configuration from '../configuration';
import { AppController } from '@/src/app/controllers/app.controller';
import { AppConfig } from './../services/config.service';
import { AppService } from '@/src/app/services/app.service';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppConfig, AppService],
})
export class AppModule {}

import { AppConfig } from './../services/config.service';
import { Module } from '@nestjs/common';
import { AppController } from '@/src/app/controllers/app.controller';
import { AppService } from '@/src/app/services/app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from '../configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
  ],
  controllers: [AppController],
  providers: [AppConfig, AppService],
})
export class AppModule {}

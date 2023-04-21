import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UserModule } from './user.module';
import { AuthController } from '../controllers/auth/auth.controller';
import { AppConfig } from '../services/config.service';
import { DiscordService } from '../services/auth/discord.service';
import { AuthService } from '../services/auth/auth.service';
import { Config } from '../interfaces/config.interface';

@Module({
  imports: [
    HttpModule,
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      useFactory: async (_config: ConfigService) => ({
        secret: _config.get<Config>('config').jwt_key,
      }),
      inject: [ConfigService],
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AppConfig, DiscordService, AuthService],
  exports: [DiscordService, AuthService],
})
export class AuthModule {}

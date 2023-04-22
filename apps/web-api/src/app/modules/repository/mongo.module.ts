import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { MongoService } from '../../services/repository/mongo.service';
import { IDataAccessService } from '../../interfaces/data-access.interface';
import { User, UserSchema } from '../../models/data/user';
import { Config } from '../../interfaces/config.interface';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
        collection: User.name.toLowerCase(),
      },
    ]),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (_config: ConfigService) => ({
        uri: _config.get<Config>('config').mongo_connection,
        dbName: 'core',
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: IDataAccessService,
      useClass: MongoService,
    },
  ],
  exports: [IDataAccessService],
})
export class MongoDataServiceModule {}

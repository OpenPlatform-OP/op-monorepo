import { Module } from '@nestjs/common';
import { MongoDataServiceModule } from './mongo.module';

@Module({
  imports: [MongoDataServiceModule],
  exports: [MongoDataServiceModule],
})
export class DataServiceModule {}

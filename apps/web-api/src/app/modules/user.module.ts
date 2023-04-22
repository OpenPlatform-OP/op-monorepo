import { Module } from '@nestjs/common';

import { DataServiceModule } from './repository/data-service.module';
import { UserService } from '../services/user.service';

@Module({
  imports: [DataServiceModule],
  controllers: [],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}

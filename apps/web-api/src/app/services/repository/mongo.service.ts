import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IDataAccessService } from '../../interfaces/data-access.interface';
import { MongoRepository } from '@nest';
import { User, UserDocument } from '../../models/data/user';

@Injectable()
export class MongoService
  implements IDataAccessService, OnApplicationBootstrap
{
  user: MongoRepository<User>;

  constructor(
    @InjectModel(User.name) private UserRepository: Model<UserDocument>
  ) {}

  onApplicationBootstrap() {
    this.user = new MongoRepository<User>(this.UserRepository);
  }
}

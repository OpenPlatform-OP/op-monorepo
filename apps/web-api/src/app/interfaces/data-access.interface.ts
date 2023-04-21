import { IGenericRepository } from '@nest';
import { User } from '../models/data/user';

export abstract class IDataAccessService {
  user: IGenericRepository<User>;
}

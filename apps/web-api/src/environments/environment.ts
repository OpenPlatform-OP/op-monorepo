import Env from '../app/enums/Env.enum';
import IEnvironment from '../app/interfaces/environment.interface';

export const environment: IEnvironment = {
  env: Env.DEV,
  port: 4500,
};

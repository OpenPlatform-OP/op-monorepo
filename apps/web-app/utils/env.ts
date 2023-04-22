import Env from '@/enums/env';
import { IEnvironment } from '@/interfaces/environment';

const getEnv = (): IEnvironment => {
  return {
    ENV: process.env.ENV as Env,
    NEXT_PUBLIC_BACKEND_ENDPOINT: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT,
  };
};

export default getEnv;

import { Env } from './enums/env.enum';
import { Config } from './interfaces/config.interface';

const configuration = (): { config: Config } => ({
  config: {
    env: (process.env.ENV as Env) || Env.LOCAL,
    port: parseInt(process.env.PORT, 10) || 3000,
  },
});

export default configuration;

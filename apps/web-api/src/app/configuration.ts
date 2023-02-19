import { environment } from './../environments/environment';

export enum ConfigKey {
  ENV = 'ENV',
  PORT = 'PORT',
}

const configuration = (): Record<ConfigKey, unknown> => {
  return {
    ENV: environment.env,
    PORT: environment.port,
  };
};

export default configuration;

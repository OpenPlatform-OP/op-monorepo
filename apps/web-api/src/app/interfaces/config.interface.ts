import { Env } from '../enums/env.enum';

export interface Config {
  env: Env;
  port: number;
}

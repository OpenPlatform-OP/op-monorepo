import { Env } from '../enums/env.enum';

export interface Config {
  env: Env;
  port: number;
  discord_oauth_client_id: string;
  discord_oauth_client_secret: string;
  discord_oauth_redirect_uri: string;
  mongo_connection: string;
  jwt_key: string;
}

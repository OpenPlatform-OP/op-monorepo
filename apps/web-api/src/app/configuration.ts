import { Env } from './enums/env.enum';
import { Config } from './interfaces/config.interface';

const configuration = (): { config: Config } => ({
  config: {
    env: (process.env.ENV as Env) || Env.LOCAL,
    port: parseInt(process.env.CORE_BE_PORT, 10) || 3000,
    discord_oauth_client_id: process.env.DISCORD_OAUTH_CLIENT_ID,
    discord_oauth_client_secret: process.env.DISCORD_OAUTH_CLIENT_SECRET,
    discord_oauth_redirect_uri: process.env.DISCORD_OAUTH_REDIRECT_URI,
    mongo_connection: process.env.MONGO_CONNECTION,
    jwt_key: process.env.JWT_KEY,
  },
});

export default configuration;

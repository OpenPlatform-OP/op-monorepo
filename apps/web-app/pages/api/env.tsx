import IEnvironment from '@/interfaces/environment';

// TODO: Remove this endpoint in production environment
export default function handler(req, res) {
  const env: IEnvironment = {
    ENV: process.env.ENV,
    DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
    DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
    DISCORD_REDIRECT_URI: process.env.DISCORD_REDIRECT_URI,
  };
  res.status(200).json(env);
}

import getEnv from '@/utils/env';

// TODO: Remove this endpoint in production environment
export default function handler(req, res) {
  res.status(200).json(getEnv());
}

import dotenv from 'dotenv';

dotenv.config();

const requiredInProd = ['JWT_SECRET', 'MONGODB_URI'];

function loadEnv() {
  const env = {
    port: Number(process.env.PORT) || 4000,
    nodeEnv: process.env.NODE_ENV || 'development',
    mongodbUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/kisan_setu',
    jwtSecret: process.env.JWT_SECRET || 'dev-only-change-me',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
    corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    openaiApiKey: process.env.OPENAI_API_KEY || '',
  };

  if (env.nodeEnv === 'production') {
    for (const key of requiredInProd) {
      if (!process.env[key]) {
        throw new Error(`Missing required env: ${key}`);
      }
    }
  }

  return env;
}

export const env = loadEnv();

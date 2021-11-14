import fs from 'fs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { env } from 'process';
import { PUBLIC_KEYS } from './constant/publicKeys';

// Load env
dotenv.config();

type key = keyof typeof PUBLIC_KEYS;
let internalKey: string = PUBLIC_KEYS.DEVELOPMENT;

if (env.NODE_ENV && !env.PUBLIC_KEY_FILE_PATH) {
  internalKey = PUBLIC_KEYS[env.NODE_ENV?.toUpperCase() as key]

  if (!internalKey) {
    throw new ReferenceError('NODE_ENV is neither PRODUCTION nor DEVELOPMENT, and no PUBLIC_KEY_FILE_PATH is given');
  }
}

if (env.PUBLIC_KEY_FILE_PATH) {
  try {
    internalKey = fs.readFileSync(env.PUBLIC_KEY_FILE_PATH as string, 'utf-8')
  } catch(err) {
    if (err.code === 'ENOENT') {
      throw new Error('Can not find publicKey file. Check your PUBLIC_KEY_FILE_PATH env')
    } else {
      throw (err);
    }
  }
}

export const verify = (token: string, audienceId: string, publicKey = internalKey) =>
  jwt.verify(token, publicKey, {
    algorithms: ['RS256', 'RS384'],
    audience: audienceId,
  });

export { internalKey as PUBLIC_KEY };

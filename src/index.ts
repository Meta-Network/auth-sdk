import jwt from "jsonwebtoken";
import { PUBLIC_KEYS } from "./constant/publicKeys";


export const verify = (token: string, audienceId: string, publicKey = PUBLIC_KEYS.DEVELOPMENT) => {
  const result = jwt.verify(token, publicKey, {
    algorithms: ['RS256', 'RS384'],
    audience: audienceId,
  });
  return result;
}
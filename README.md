# Meta Network Auth SDK

This SDK is written in TypeScript, so typing is good.
## API

Currently, There is only one API exist. `verify()`.

Example: 
```typescript
import { verify } from "@meta-network/auth-sdk"

function handleMetaNetworkAccessToken(token: string) {
  const audienceId = "ACME";

  // `SERVER_PUBLIC_KEY` is optional, only needed if you run a custom server
  const SERVER_PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCkxk8cbPVsDZpJmsUpXyQPhThf
M7K9juBR6sD7i6WQJzZjVftG+2RMIU2B7b4THz79Iu7ofX4sD9Si6y3hz0XbM7yI
cZ/z90PFzAyDVYR3LWhVoTtMZwOsa42J4/DRvf3D90yPLoMtRW4PVd1FsKVEj2UO
B1WcMmlUmlVTPaPbQQIDAQAB
-----END PUBLIC KEY-----`;
  let decodedJwtPayload;
  try {
      decodedJwtPayload = verify(token, audienceId, SERVER_PUBLIC_KEY);
  } catch (error) {
    throw new Error("Failed to verify the token");
  }
  // ... handle the rest
}
```
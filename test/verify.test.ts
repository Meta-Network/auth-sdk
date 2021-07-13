import { JsonWebTokenError } from 'jsonwebtoken';
import { verify } from '../src';

describe('verify', () => {
  it('passed if everything is good', () => {
    const t = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IllKU1AiLCJzdWIiOjExNDUxNDE5MTk4MTAsImF1ZCI6Il9fRk9SX1RFU1RfXyIsImp0aSI6ImIzM2ZiMzNmYmVlZmJlZWZiMzNmYjMzZiIsImlhdCI6MTYyNjE2NDU3NywiZXhwIjo5NzI2MTY4MTc3fQ.C_je81esLA23wTBgWrCJyM3M80-zXdX1u7WP3Om60Bl77OuRMxJz_iES5EQYeKZ87OdzDpB_Q3texWMfD0tKaYYljyb4VTPMhPxcSSsilPZE07uu3G3mie8VPgxCQNwA38jd4RVkrgaioiVLNxk8Nl-WNG2qXyEeQXLgWp8MzAE'
    const verification = () => verify(t, '__FOR_TEST__')
    expect(verification).not.toThrow()
    const res = verification()
    expect(res.sub).toEqual(1145141919810);
  });

  it('fail if `aud` was mismatched', () => {
    const t = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJzdWIiOjEsImF1ZCI6ImZvb2JhciIsImp0aSI6IjNiNWJhYWQzYmU3Y2EyNjE3ZjNjMmMxNzE3ZTYyNWFkNzAyODJiYmQiLCJpYXQiOjE2MjYxNjQ1NzcsImV4cCI6MTYyNjE2ODE3N30.PBXiQ5PXFfjIIjfX4LLeVJ4wKyxxLvB1PqMtDHD5psXJGI6wahDGFPRBvTLF4KcgkmzbU6srOy2nVw5fMxQ2-Iaj0iQSCpn-xOwvtrjkCoiyeWS0XCmgHH_CkISmuiOqd68POs6b6kwwzDXngxJ4ruiUwT7XeV8xT-OtkZvUrvw'
    expect(() => verify(t, '_SOME_OTHER_TARGET_')).toThrow(JsonWebTokenError)
  });

  it('fail if sig was fxxk around', () => {
    const t = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IllKU1AiLCJzdWIiOjExNDUxNDE5MTk4MTAsImF1ZCI6Il9fRk9SX1RFU1RfXyIsImp0aSI6ImIzM2ZiMzNmYmVlZmJlZWZiMzNmYjMzZiIsImlhdCI6MTYyNjE2NDU3NywiZXhwIjo5NzI2MTY4MTc3fQ.C_je81esLA23wTBgWrCJyM3M80-zXdX1u7WP3Om60Bl77OuRMxJz_iES5EQYeKZ87OdzDpB_Q3texWMfD0tKaYYljyb4VTPMhPxcSSsilPZE07uu3G3mie8VPgxCQNwA38jd4RVkrgaioiVLNxk8Nl-WGGGGXyEeQXLgWp8MzAE'
    expect(() => verify(t, '__FOR_TEST__')).toThrow(JsonWebTokenError)
  });
});

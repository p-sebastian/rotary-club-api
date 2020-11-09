import {generateExpirationInHours} from '@marblejs/middleware-jwt'
import {TUserDoc} from '@routes/user/model/user.model'

export type TTokenPayload = {sub: string; exp: number}
export const generateTokenPayload = (user: TUserDoc) => ({
  tokenize: {
    sub: user.sub!,
    exp: generateExpirationInHours(24 * 30), // 30 days
  } as TTokenPayload,
  user,
})

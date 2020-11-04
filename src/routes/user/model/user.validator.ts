import {t} from '@marblejs/middleware-io'

export const UserValidator = Object.freeze({
  create: t.type({
    sub: t.string,
    email: t.string,
  }),
})

export type TUserCreate = t.TypeOf<typeof UserValidator.create>

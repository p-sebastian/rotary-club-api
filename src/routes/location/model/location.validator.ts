import {t} from '@marblejs/middleware-io'

export const LocationValidator = Object.freeze({
  findById: t.type({
    id: t.string,
  }),
  create: t.type({
    latitude: t.number,
    longitude: t.number,
    name: t.string,
  }),
})

export type TLocationCreate = t.TypeOf<typeof LocationValidator.create>

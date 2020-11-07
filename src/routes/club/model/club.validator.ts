import {t} from '@marblejs/middleware-io'
import {ClubTypeEnum} from 'interfaces/TClub.type'

export const ClubValidator = Object.freeze({
  create: t.type({
    name: t.string,
    foundedOn: t.string,
    code: t.string,
    active: t.boolean,
    type: t.union([t.literal(ClubTypeEnum.Rotary), t.literal(ClubTypeEnum.Rotarac)]),
  }),
})

export type TClubCreateDTO = t.TypeOf<typeof ClubValidator.create>

import {t} from '@marblejs/middleware-io'
import {optional} from '@util/optional.util'
import {ClubTypeEnum} from 'interfaces/TClub.type'
import {GenderEnum} from 'interfaces/TUser.type'

export const UserDto = Object.freeze({
  user: t.type({
    sub: t.string,
    district: t.string,
    identification: t.string,
    club: t.string,
    birthday: optional(t.string),
    profession: optional(t.string),
    activity: optional(t.string),
    memberId: t.string,
    fullName: t.string,
    prefix: optional(t.string),
    firstName: t.string,
    middleName: optional(t.string),
    lastName: t.string,
    suffix: optional(t.string),
    gender: t.union([t.literal(GenderEnum.Male), t.literal(GenderEnum.Female)]),
    language: optional(t.string),
    originalAdmissionDate: optional(t.string),
    admissionDate: t.string,
    affiliate: optional(t.string),
    registered: t.boolean,
    email: t.string,
    secondaryEmail: optional(t.string),
    countryCode: t.number,
    phone: optional(t.string),
    addressLine1: optional(t.string),
    addressLine2: optional(t.string),
    addressLine3: optional(t.string),
    city: optional(t.string),
    state: optional(t.string),
    province: optional(t.string),
    country: t.string,
    postalCode: optional(t.string),
    postalStamp: optional(t.string),
  }),

  create: t.type({
    sub: t.string,
    email: t.string,
  }),

  verify: t.type({
    identification: t.string,
  }),

  login: t.type({
    sub: t.string,
  }),

  register: t.type({
    sub: t.string,
    birthday: optional(t.string),
    profession: optional(t.string),
    activity: optional(t.string),
    fullName: t.string,
    prefix: optional(t.string),
    firstName: t.string,
    middleName: optional(t.string),
    lastName: t.string,
    suffix: optional(t.string),
    gender: t.union([t.literal(GenderEnum.Male), t.literal(GenderEnum.Female)]),
    language: optional(t.string),
    affiliate: optional(t.string),
    email: t.string,
    secondaryEmail: optional(t.string),
    countryCode: t.number,
    phone: optional(t.string),
    addressLine1: optional(t.string),
    addressLine2: optional(t.string),
    addressLine3: optional(t.string),
    city: optional(t.string),
    state: optional(t.string),
    province: optional(t.string),
    country: t.string,
    postalCode: optional(t.string),
    postalStamp: optional(t.string),
  }),

  filter: t.type({
    ageEnabled: optional(t.boolean),
    club: t.array(t.string),
    range: optional(
      t.type({
        lower: t.number,
        upper: t.number,
      }),
    ),
    type: optional(t.union([t.literal(ClubTypeEnum.Rotary), t.literal(ClubTypeEnum.Rotarac)])),
  }),
})

export type TUserCreate = t.TypeOf<typeof UserDto.create>
export type TUserDto = t.TypeOf<typeof UserDto.user>
export type TUserRegisterDto = t.TypeOf<typeof UserDto.register>
export type TUserFilterDTO = t.TypeOf<typeof UserDto.filter>

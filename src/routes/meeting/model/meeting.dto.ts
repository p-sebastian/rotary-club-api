import {t} from '@marblejs/middleware-io'

export const MeetingDto = Object.freeze({
  create: t.type({
    name: t.string,
    startDate: t.string,
    duration: t.number,
    members: t.array(t.string),
    club: t.string,
    createdBy: t.string,
  }),
})

export type TMeetingCreate = t.TypeOf<typeof MeetingDto.create>

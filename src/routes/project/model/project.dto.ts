import {t} from '@marblejs/middleware-io'
import {optional} from '@util/optional.util'

export const ProjectDto = Object.freeze({
  create: t.type({
    _id: optional(t.string),
    name: t.string,
    startDate: t.string,
    endDate: t.string,
    club: t.string,
    members: t.array(t.string),
    benefactorAmount: t.number,
    budget: t.number,
    amountGathered: t.number,
    duration: t.number,
    volunteerHours: t.number,
    numberOfVolunteers: t.number,
    otherInstructions: optional(t.string),
  }),
})

export type TProjectCreate = t.TypeOf<typeof ProjectDto.create>

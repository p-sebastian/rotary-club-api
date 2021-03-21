import {combineRoutes} from '@marblejs/core'

import {createMeeting$} from './effects/create.effect'
import {findByMyClubEffect$} from './effects/findByMyClub.effect'

export const meeting$ = combineRoutes('/meeting', {
  effects: [findByMyClubEffect$, createMeeting$],
})

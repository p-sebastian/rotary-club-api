import {combineRoutes} from '@marblejs/core'

import {assignRoles$} from './effects/assignRoles.effect'

export const role$ = combineRoutes('/role', {
  effects: [assignRoles$],
})

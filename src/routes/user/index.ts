import {combineRoutes} from '@marblejs/core'

import {getUserList$} from './effects/getUserList.effect'
import {putUser$} from './effects/putUser.effect'

export const users$ = combineRoutes('/user', {
  effects: [getUserList$, putUser$],
})

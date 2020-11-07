import {combineRoutes} from '@marblejs/core'

import {getUserList$} from './effects/getUserList.effect'
import {importUsers$} from './effects/importUsers.effect'

export const users$ = combineRoutes('/user', {
  effects: [getUserList$, importUsers$],
})

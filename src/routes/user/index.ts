import {combineRoutes} from '@marblejs/core'

import {allUsersOfClub$} from './effects/allUsersOfClub.effect'
import {filterUser$} from './effects/filterUser.effect'
import {getUserList$} from './effects/getUserList.effect'
import {importUsers$} from './effects/importUsers.effect'
import {loginUser$} from './effects/loginUser.effect'
import {userRegister$} from './effects/registerUser.effect'
import {verifyUser$} from './effects/verifyUser.effect'

export const users$ = combineRoutes('/user', {
  effects: [getUserList$, importUsers$, verifyUser$, userRegister$, loginUser$, filterUser$, allUsersOfClub$],
})

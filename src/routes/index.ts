import {getFile$, preflight$, version$} from '@common'
import {combineRoutes} from '@marblejs/core'

import {club$} from './club'
import {users$} from './user'
import {loginUser$} from './user/effects/loginUser.effect'

export const api$ = combineRoutes('/api/v1', [getFile$, preflight$, version$, club$, users$, loginUser$])

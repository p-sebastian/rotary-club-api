import {getFile$, preflight$, version$} from '@common'
import {combineRoutes} from '@marblejs/core'

import {club$} from './club'
import {project$} from './project'
import {users$} from './user'

export const api$ = combineRoutes('/api/v1', [getFile$, preflight$, version$, club$, users$, project$])

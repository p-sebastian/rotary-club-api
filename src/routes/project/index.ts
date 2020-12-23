import {combineRoutes} from '@marblejs/core'

import {createProject$} from './effects/createProject.effect'
import {getProjectList$} from './effects/getProjectList.effect'

export const project$ = combineRoutes('/project', {
  effects: [getProjectList$, createProject$],
})

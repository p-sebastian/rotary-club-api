import {combineRoutes} from '@marblejs/core'

import {importClubs$} from './effects/importClubs.effect'

export const club$ = combineRoutes('/club', {
  effects: [importClubs$],
})

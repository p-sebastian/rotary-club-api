import {combineRoutes} from '@marblejs/core'

import {getClubList$} from './effects/getClubList.effect'
import {importClubs$} from './effects/importClubs.effect'

export const club$ = combineRoutes('/club', {
  effects: [importClubs$, getClubList$],
})

import {combineRoutes} from '@marblejs/core'

import {getLocationById$} from './effects/getLocation.effect'
import {getLocationList$} from './effects/getLocationList.effect'
import {putLocation$} from './effects/putLocation.effect'

export const location$ = combineRoutes('/location', {
  effects: [getLocationList$, getLocationById$, putLocation$],
})

import {r} from '@marblejs/core'
import {map, mergeMap} from 'rxjs/operators'

import {LocationDao} from '../model/location.dao'

export const getLocationList$ = r.pipe(
  r.matchPath('/'),
  r.matchType('GET'),
  r.useEffect(req$ =>
    req$.pipe(
      mergeMap(LocationDao.findAll),
      map(locations => ({body: locations})),
    ),
  ),
)

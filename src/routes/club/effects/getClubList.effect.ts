import {r} from '@marblejs/core'
import {map, mergeMap} from 'rxjs/operators'

import {ClubDao} from '../model/club.dao'

export const getClubList$ = r.pipe(
  r.matchPath('/'),
  r.matchType('GET'),
  r.useEffect(req$ =>
    req$.pipe(
      mergeMap(ClubDao.findAll),
      map(clubs => ({body: clubs})),
    ),
  ),
)

import {r} from '@marblejs/core'
import {map, mergeMap} from 'rxjs/operators'

import {UserDao} from '../model/user.dao'

export const getUserList$ = r.pipe(
  r.matchPath('/'),
  r.matchType('GET'),
  r.useEffect(req$ =>
    req$.pipe(
      mergeMap(UserDao.findAll),
      map(users => ({body: users})),
    ),
  ),
)

import {r} from '@marblejs/core'
import {requestValidator$} from '@marblejs/middleware-io'
import {authorize$} from 'common/middleware/authorize.middleware'
import {map, mergeMap} from 'rxjs/operators'

import {UserDao} from '../model/user.dao'
import {UserDto} from '../model/user.dto'

export const filterUser$ = r.pipe(
  r.matchPath('/filter'),
  r.matchType('POST'),
  r.use(authorize$),
  r.useEffect(req$ =>
    req$.pipe(
      requestValidator$({body: UserDto.filter}),
      map(({body}) => body),
      mergeMap(UserDao.filter),
      map(users => ({body: users})),
    ),
  ),
)

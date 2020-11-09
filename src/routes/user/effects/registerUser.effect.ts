import {r} from '@marblejs/core'
import {requestValidator$} from '@marblejs/middleware-io'
import {UserDao} from '@routes/user/model/user.dao'
import {map, mergeMap} from 'rxjs/operators'

import {UserDto} from '../model/user.dto'

export const userRegister$ = r.pipe(
  r.matchPath('/register/:identification'),
  r.matchType('PUT'),
  r.useEffect(req$ =>
    req$.pipe(
      requestValidator$({body: UserDto.register, params: UserDto.verify}),
      mergeMap(({body, params}) => UserDao.register(params.identification, body)),
      map(user => ({body: user})),
    ),
  ),
)

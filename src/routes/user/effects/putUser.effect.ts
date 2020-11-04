import {r} from '@marblejs/core'
import {requestValidator$} from '@marblejs/middleware-io'
import {onError} from '@utils/error.util'
import {catchError, map, mergeMap} from 'rxjs/operators'

import {UserDao} from '../model/user.dao'
import {UserValidator} from '../model/user.validator'

export const putUser$ = r.pipe(
  r.matchPath('/'),
  r.matchType('PUT'),
  r.useEffect(req$ =>
    req$.pipe(
      requestValidator$({body: UserValidator.create}),
      mergeMap(req => UserDao.create(req.body)),
      map(user => ({body: user})),
      catchError(onError('Unknown')),
    ),
  ),
)

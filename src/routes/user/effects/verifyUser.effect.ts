import {HttpStatus, r} from '@marblejs/core'
import {requestValidator$} from '@marblejs/middleware-io'
import {onError} from '@util/error.util'
import {neverNullable} from '@util/rxjs.util'
import {iif, of} from 'rxjs'
import {catchError, mergeMap} from 'rxjs/operators'

import {UserDao} from '../model/user.dao'
import {UserDto} from '../model/user.dto'

export const verifyUser$ = r.pipe(
  r.matchPath('/verify/:identification'),
  r.matchType('GET'),
  r.useEffect(req$ =>
    req$.pipe(
      requestValidator$({params: UserDto.verify}),
      mergeMap(({params}) => UserDao.verifyUser(params.identification)),
      mergeMap(neverNullable),
      mergeMap(user =>
        iif(() => !user.sub, of({body: user}), of({body: 'User already registered', status: HttpStatus.UNAUTHORIZED})),
      ),
      catchError(onError('User does not exist', HttpStatus.NOT_FOUND)),
    ),
  ),
)

import {Config} from '@config'
import {HttpStatus, r} from '@marblejs/core'
import {requestValidator$} from '@marblejs/middleware-io'
import {generateToken} from '@marblejs/middleware-jwt'
import {onError} from '@util/error.util'
import {neverNullable} from '@util/rxjs.util'
import {generateTokenPayload} from '@util/token.util'
import {of} from 'rxjs'
import {catchError, map, mergeMap} from 'rxjs/operators'

import {UserDao} from '../model/user.dao'
import {UserDto} from '../model/user.dto'

export const loginUser$ = r.pipe(
  r.matchPath('/login'),
  r.matchType('POST'),
  r.useEffect(req$ =>
    req$.pipe(
      requestValidator$({body: UserDto.login}),
      map(({body}) => body.sub),
      mergeMap(UserDao.findUserBySub),
      mergeMap(neverNullable),
      map(generateTokenPayload),
      mergeMap(({tokenize, user}) =>
        of(tokenize).pipe(
          map(generateToken({secret: Config.jwt.secret})),
          map(token => ({body: {token, user}})),
        ),
      ),
      catchError(onError('User does not exist', HttpStatus.NOT_FOUND)),
    ),
  ),
)

import {Config} from '@config'
import {HttpError, HttpMiddlewareEffect, HttpRequest, HttpStatus} from '@marblejs/core'
import {AuthorizeMiddlewareConfig, verifyToken$} from '@marblejs/middleware-jwt'
import {parseAuthorizationHeader} from '@marblejs/middleware-jwt/dist/jwt.util'
import {UserDao} from '@routes/user/model/user.dao'
import {TUserDoc} from '@routes/user/model/user.model'
import {neverNullable} from '@util/rxjs.util'
import {TTokenPayload} from '@util/token.util'
import {Document} from 'mongoose'
import {Observable, of, throwError} from 'rxjs'
import {catchError, map, mapTo, mergeMap, tap} from 'rxjs/operators'

const config = {secret: Config.jwt.secret}

const verifyPayload$ = (payload: TTokenPayload) => UserDao.findUserBySub(payload.sub).pipe(mergeMap(neverNullable))

const assignPayloadToRequest = <T>(req: HttpRequest) => (payload: T) => (req.user = payload)
const jwt$ = <T extends Document>(
  config: AuthorizeMiddlewareConfig,
  verifyPayload$: (payload: any) => Observable<T>,
): HttpMiddlewareEffect => req$ =>
  req$.pipe(
    mergeMap(req =>
      of(req).pipe(
        map(parseAuthorizationHeader),
        mergeMap(verifyToken$(config)),
        mergeMap(verifyPayload$),
        tap(assignPayloadToRequest(req)),
        mapTo(req),
        catchError(() => throwError(new HttpError('Unauthorized', HttpStatus.UNAUTHORIZED, undefined, req))),
      ),
    ),
  )

export const authorize$ = jwt$<TUserDoc>(config, verifyPayload$)

import path from 'path'

import {HttpError, HttpStatus, r} from '@marblejs/core'
import FileHelper from '@marblejs/core/dist/+internal/files'
import {requestValidator$, t} from '@marblejs/middleware-io'
import {iif, of, throwError} from 'rxjs'
import {catchError, map, mergeMap} from 'rxjs/operators'

const STATIC_PATH = path.resolve(__dirname, '../../../assets')

const validator = t.type({
  dir: t.string,
})

export const getFile$ = r.pipe(
  r.matchPath('/assets/:dir*'),
  r.matchType('GET'),
  r.useEffect(req$ =>
    req$.pipe(
      requestValidator$({params: validator}),
      mergeMap(({url, params}) =>
        of(params.dir).pipe(
          mergeMap(FileHelper.readFile(STATIC_PATH)),
          map(body => ({body})),
          catchError(error =>
            iif(
              () => error.code === 'ENOENT',
              throwError(new HttpError(`Asset not found for path: ${url}`, HttpStatus.NOT_FOUND)),
              throwError(new HttpError('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR)),
            ),
          ),
        ),
      ),
    ),
  ),
)

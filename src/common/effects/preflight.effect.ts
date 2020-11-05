import {HttpStatus, r} from '@marblejs/core'
import {mapTo} from 'rxjs/operators'

export const preflight$ = r.pipe(
  r.matchPath('*'),
  r.matchType('OPTIONS'),
  r.useEffect(req$ => req$.pipe(mapTo({status: HttpStatus.OK}))),
)

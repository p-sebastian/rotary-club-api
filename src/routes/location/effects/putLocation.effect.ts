import {r} from '@marblejs/core'
import {requestValidator$} from '@marblejs/middleware-io'
import {onError} from '@utils/error.util'
import {catchError, map, mergeMap} from 'rxjs/operators'

import {LocationDao} from '../model/location.dao'
import {LocationValidator} from '../model/location.validator'

export const putLocation$ = r.pipe(
  r.matchPath('/'),
  r.matchType('PUT'),
  r.useEffect(req$ =>
    req$.pipe(
      requestValidator$({body: LocationValidator.create}),
      mergeMap(req => LocationDao.create(req.body)),
      map(location => ({body: location})),
      catchError(onError('Unknown')),
    ),
  ),
)

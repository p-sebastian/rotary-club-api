import {r, use} from '@marblejs/core'
import {multipart$} from '@marblejs/middleware-multipart'
import {map, mergeMap, tap} from 'rxjs/operators'
import xlsx from 'xlsx'

import {ClubDao} from '../model/club.dao'

export const importClubs$ = r.pipe(
  r.matchPath('/import'),
  r.matchType('POST'),
  r.useEffect(req$ => {
    return req$.pipe(
      use(multipart$({maxFieldCount: 1, files: ['clubs']})),
      tap(req => console.info(req.files['clubs']?.buffer)),
      map(req => xlsx.read(req.files['clubs'].buffer, {type: 'buffer'})),
      mergeMap(ClubDao.formatXLSX),
      // tap(req => console.info(req)),
      // map(doc => xlsx.utils.sheet_to_json(doc) as string[]),
      // tap(req => console.info(req)),
      map(body => ({
        body,
      })),
    )
  }),
)

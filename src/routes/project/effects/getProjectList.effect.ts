import {r} from '@marblejs/core'
import {authorize$} from 'common/middleware/authorize.middleware'
import {map, mergeMap} from 'rxjs/operators'

import {ProjectDao} from '../model/project.dao'

export const getProjectList$ = r.pipe(
  r.matchPath('/'),
  r.matchType('GET'),
  r.use(authorize$),
  r.useEffect(req$ =>
    req$.pipe(
      mergeMap(ProjectDao.findAll),
      map(project => ({body: project})),
    ),
  ),
)

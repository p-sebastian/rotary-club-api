import {r} from '@marblejs/core'
import {requestValidator$} from '@marblejs/middleware-io'
import {map, mergeMap} from 'rxjs/operators'

import {ProjectDao} from '../model/project.dao'
import {ProjectDto} from '../model/project.dto'

export const createProject$ = r.pipe(
  r.matchPath('/'),
  r.matchType('PUT'),
  r.useEffect(req$ =>
    req$.pipe(
      requestValidator$({body: ProjectDto.create}),
      mergeMap(({body}) => ProjectDao.create(body)),
      map(project => ({body: project})),
    ),
  ),
)

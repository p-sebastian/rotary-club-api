import {r} from '@marblejs/core'
import {UserDao} from '@routes/user/model/user.dao'
import {neverNullable} from '@util/rxjs.util'
import {authorize$} from 'common/middleware/authorize.middleware'
import {map, mergeMap} from 'rxjs/operators'

import {MeetingDao} from '../model/meeting.dao'

export const findByMyClubEffect$ = r.pipe(
  r.matchPath('/'),
  r.matchType('GET'),
  r.use(authorize$),
  r.useEffect(req$ =>
    req$.pipe(
      mergeMap((req: any) => UserDao.findUserBySub(req.user.sub)),
      mergeMap(neverNullable),
      mergeMap((user: any) => MeetingDao.findByClub(user.club._id)),
      map(meetings => ({body: meetings})),
    ),
  ),
)

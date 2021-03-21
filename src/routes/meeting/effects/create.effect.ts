import {r} from '@marblejs/core'
import {requestValidator$} from '@marblejs/middleware-io'
import {map, mergeMap} from 'rxjs/operators'

import {MeetingDao} from '../model/meeting.dao'
import {MeetingDto} from '../model/meeting.dto'

export const createMeeting$ = r.pipe(
  r.matchPath('/'),
  r.matchType('PUT'),
  r.useEffect(req$ =>
    req$.pipe(
      requestValidator$({body: MeetingDto.create}),
      mergeMap(({body}) => MeetingDao.create(body)),
      map(meeting => ({body: meeting})),
    ),
  ),
)

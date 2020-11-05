import {LoggerTag, LoggerToken, r, use, useContext} from '@marblejs/core'
import {multipart$} from '@marblejs/middleware-multipart'
import {mapTo, tap} from 'rxjs/operators'

export const importClubs$ = r.pipe(
  r.matchPath('/import'),
  r.matchType('POST'),
  r.useEffect((req$, ctx) => {
    const logger = useContext(LoggerToken)(ctx.ask)

    return req$.pipe(
      use(multipart$({maxFieldCount: 1, files: ['clubs']})),
      tap(req =>
        logger({message: req.files['clubs']?.filename ?? 'Not Found', tag: LoggerTag.HTTP, type: 'importClub$'}),
      ),
      mapTo({body: 'Hello'}),
    )
  }),
)

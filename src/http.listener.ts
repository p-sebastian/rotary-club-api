import {httpListener} from '@marblejs/core'
import {bodyParser$} from '@marblejs/middleware-body'
import {logger$} from '@marblejs/middleware-logger'

import {api$} from './routes'

const middlewares = [
  logger$(),
  bodyParser$(),
  // middleware3$
  // middleware4$
  // ...
]

const effects = [api$]

export const listener = httpListener({
  middlewares,
  effects,
})

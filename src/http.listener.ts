import {httpListener} from '@marblejs/core'
import {bodyParser$} from '@marblejs/middleware-body'
import {cors$} from '@marblejs/middleware-cors'
import {logger$} from '@marblejs/middleware-logger'

import {api$} from './routes'

const middlewares = [
  logger$(),
  bodyParser$(),
  cors$({
    origin: '*',
    allowHeaders: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  }),
  // middleware3$
  // middleware4$
  // ...
]

const effects = [api$]

export const listener = httpListener({
  middlewares,
  effects,
})

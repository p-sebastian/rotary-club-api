import fs from 'fs'

import {createServer} from '@marblejs/core'
import {IO} from 'fp-ts/lib/IO'

import {Config} from './config'
import {Database} from './config/database'
import {listener} from './http.listener'

const server = createServer({
  port: Number(Config.server.port),
  hostname: Config.server.host,
  listener,
  options: {
    httpsOptions: {
      cert: fs.readFileSync(Config.cert),
      key: fs.readFileSync(Config.key),
    },
  },
})

const main: IO<void> = async () => {
  await Database.connect()
  await (await server)()
}

main()

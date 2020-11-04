import {Config} from '@config'
import chalk from 'chalk'
import mongoose from 'mongoose'

const {url} = Config.db

const onOpen = () => {
  console.info(chalk.green('[database] connected'))
}

const onError = (error: mongoose.Error) => {
  console.error(chalk.red(`[database] connection error: ${error.message}`))
  process.exit()
}

export const Database = Object.freeze({
  connect: () => mongoose.connect(url, {useUnifiedTopology: true, useNewUrlParser: true}).then(onOpen).catch(onError),

  disconnect: () => mongoose.disconnect(),

  drop: () => mongoose.connection.dropDatabase(),
})

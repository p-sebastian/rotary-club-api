import {HttpError, HttpStatus} from '@marblejs/core'
import {throwError} from 'rxjs'

export const onError = (message: string, status: HttpStatus = HttpStatus.BAD_REQUEST) => (e: any) =>
  throwError(
    e && e.message.includes('Validation') ? e : new HttpError(`An Error Ocurred: ${e.message ?? message}`, status),
  )

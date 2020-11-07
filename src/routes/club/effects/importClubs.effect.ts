import {r, use} from '@marblejs/core'
import {HttpError, HttpStatus} from '@marblejs/core'
import {multipart$} from '@marblejs/middleware-multipart'
import {ignoreDuplicates} from '@util/error.util'
import {TSheet, esMonths, numbersRegex, onlyLettersRegex} from '@util/xlsx.util'
import {ClubTypeEnum, ClubXHeaderNames, TClub} from 'interfaces/TClub.type'
import {DateTime} from 'luxon'
import {catchError, map, mergeMap} from 'rxjs/operators'
import xlsx from 'xlsx'

import {ClubDao} from '../model/club.dao'

export const importClubs$ = r.pipe(
  r.matchPath('/import'),
  r.matchType('PUT'),
  r.useEffect(req$ => {
    return req$.pipe(
      use(multipart$({maxFieldCount: 1, files: ['clubs']})),
      map(req => xlsx.read(req.files['clubs'].buffer, {type: 'buffer'})),
      map(formatXLSX),
      mergeMap(ClubDao.createMultiple),
      map(body => ({
        body,
      })),
      catchError(ignoreDuplicates),
    )
  }),
)

const formatXLSX = (doc: xlsx.WorkBook) => {
  const headers = {
    [ClubXHeaderNames.ClubName]: 'A',
    [ClubXHeaderNames.Active]: 'B',
    [ClubXHeaderNames.DateFounded]: 'C',
  }
  const sheetName = doc.SheetNames[0]
  const sheet = doc.Sheets[sheetName]
  if (!sheet) {
    throw new HttpError('No sheets available', HttpStatus.NO_CONTENT)
  }
  const keys = Object.keys(sheet).filter(key => key[0] !== '!')
  const clubs: {[key: number]: TClub} = {}

  keys.forEach(key => {
    const {v = ''} = sheet[key] as TSheet
    const letter = key.replace(onlyLettersRegex, '').toLocaleUpperCase()
    const [row] = key.match(numbersRegex) ?? []
    if (!row) {
      // no row
      return
    }
    if (row.length === 1 && row === '1') {
      return assignHeader(v.toLocaleLowerCase().trim() as any, letter)
    }
    if (!clubs[row]) {
      clubs[row] = initClub()
    }
    if (letter === headers[ClubXHeaderNames.ClubName]) {
      const end = v.lastIndexOf('(')
      const code = v.substring(end + 1, v.lastIndexOf(')'))
      clubs[row].code = code
      clubs[row].name = v.substring(0, end).trim()
      clubs[row].type = v[v.length - 1] === '*' ? ClubTypeEnum.Rotarac : ClubTypeEnum.Rotary
    }
    if (letter === headers[ClubXHeaderNames.Active]) {
      clubs[row].active = v.toLocaleLowerCase().trim() !== ''
    }
    if (letter === headers[ClubXHeaderNames.DateFounded]) {
      const [day, m, year] = v.split('-')
      const founded = DateTime.local(Number(year), esMonths[m.toLocaleLowerCase()], Number(day)).toISO()
      clubs[row].foundedOn = founded
    }
  })

  return Object.values(clubs)

  function assignHeader(key: ClubXHeaderNames, value: string) {
    headers[key] = value
  }
}

const initClub = (): TClub => ({type: ClubTypeEnum.Rotary, name: '', active: false, code: '123', foundedOn: ''})

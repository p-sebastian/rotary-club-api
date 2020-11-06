import {HttpError, HttpStatus} from '@marblejs/core'
import {ClubTypeEnum, ClubXHeaderNames, TClub} from 'interfaces/TClub.type'
import {DateTime} from 'luxon'
import {of} from 'rxjs'
import xlsx from 'xlsx'

export const ClubDao = Object.freeze({
  formatXLSX: (doc: xlsx.WorkBook) => of({data: formatXLSX(doc)}),
})

const formatXLSX = (doc: xlsx.WorkBook) => {
  // match single instance of `1` after a char with none after
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

  // const club: TClub = initClub()
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
      const founded = DateTime.local(Number(year), months[m.toLocaleLowerCase()], Number(day)).toISO()
      // const founded = DateTime.local().toISO()
      clubs[row].foundedOn = founded
    }
  })

  return Object.values(clubs)

  function assignHeader(key: ClubXHeaderNames, value: string) {
    headers[key] = value
  }
}

const numbersRegex = /\d+/
const onlyLettersRegex = /[^a-zA-Z]+/g
const initClub = (): TClub => ({type: ClubTypeEnum.Rotary, name: '', active: false, code: '123', foundedOn: ''})
type TSheet = {
  t: string
  v: string
  r: string
  h: string
  w: string
}

const months = Object.freeze({
  ene: 1,
  feb: 2,
  mar: 3,
  abr: 4,
  may: 5,
  jun: 6,
  jul: 7,
  ago: 8,
  sep: 9,
  oct: 10,
  nov: 11,
  dec: 12,
})

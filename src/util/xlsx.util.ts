import {DateTime} from 'luxon'

export const handleDate = (v: string) => {
  const [day, m, year] = v.split('-')
  return DateTime.local(Number(year), esMonths[m.toLocaleLowerCase()], Number(day)).toISO()
}
export const numbersRegex = /\d+/
export const onlyLettersRegex = /[^a-zA-Z]+/g

export const esMonths = Object.freeze({
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

export type TSheet = {
  t: string
  v: string
  r: string
  h: string
  w: string
}

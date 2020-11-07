import {r, use} from '@marblejs/core'
import {HttpError, HttpStatus} from '@marblejs/core'
import {multipart$} from '@marblejs/middleware-multipart'
import {ClubDao} from '@routes/club/model/club.dao'
import {Club} from '@routes/club/model/club.model'
import {DocumentType} from '@typegoose/typegoose'
import {ignoreDuplicates} from '@util/error.util'
// import {ignoreDuplicates} from '@util/error.util'
import {TSheet, handleDate, numbersRegex, onlyLettersRegex} from '@util/xlsx.util'
import {GenderEnum, UserXHeaderNames} from 'interfaces/TUser.type'
import {Types} from 'mongoose'
import {catchError, map, mergeMap} from 'rxjs/operators'
import xlsx from 'xlsx'

import {UserDao} from '../model/user.dao'
import {TUserDto} from '../model/user.dto'

export const importUsers$ = r.pipe(
  r.matchPath('/import'),
  r.matchType('PUT'),
  r.useEffect(req$ => {
    return req$.pipe(
      use(multipart$({maxFieldCount: 1, files: ['members']})),
      map(req => xlsx.read(req.files['members'].buffer, {type: 'buffer'})),
      mergeMap(doc =>
        ClubDao.findAllCodeOnly().pipe(
          map(clubs => formatXLSX(doc, clubs)),
          mergeMap(UserDao.createMultiple),
          map(body => ({
            body,
          })),
        ),
      ),
      catchError(ignoreDuplicates),
    )
  }),
)
const formatXLSX = (doc: xlsx.WorkBook, clubs: DocumentType<Club>[]) => {
  console.info(clubs[0])
  const headers: {[key in keyof typeof UserXHeaderNames]: string} = {} as any
  const sheetName = doc.SheetNames[1]
  const sheet = doc.Sheets[sheetName]
  if (!sheet) {
    throw new HttpError('No sheets available', HttpStatus.NO_CONTENT)
  }
  const keys = Object.keys(sheet).filter(key => key[0] !== '!')
  const members: {[key: number]: TUserDto} = {}

  keys.forEach(sheetKey => {
    const {w = ''} = sheet[sheetKey] as TSheet
    const letter = sheetKey.replace(onlyLettersRegex, '').toLocaleUpperCase()
    const [row] = sheetKey.match(numbersRegex) ?? []
    if (!row) {
      // no row
      return
    }
    if (row.length === 1 && row === '1') {
      return assignHeader(w.toLocaleLowerCase().trim() as any, letter)
    }
    if (!members[row]) {
      members[row] = initUser()
    }
    assignValue(UserXHeaderNames.District, 'district', v => v)
    assignValue(UserXHeaderNames.Identification, 'identification', v => v)
    assignValue(UserXHeaderNames.ClubAndCode, 'club', handleClub)
    assignValue(UserXHeaderNames.Birthday, 'birthday', handleDate)
    assignValue(UserXHeaderNames.Profession, 'profession', v => v)
    assignValue(UserXHeaderNames.Activity, 'activity', v => v)
    assignValue(UserXHeaderNames.MemberId, 'memberId', v => v)
    assignValue(UserXHeaderNames.FullName, 'fullName', v => v)
    assignValue(UserXHeaderNames.Prefix, 'prefix', v => v)
    assignValue(UserXHeaderNames.FirstName, 'firstName', v => v)
    assignValue(UserXHeaderNames.MiddleName, 'middleName', v => v)
    assignValue(UserXHeaderNames.LastName, 'lastName', v => v)
    assignValue(UserXHeaderNames.Suffix, 'suffix', v => v)
    assignValue(UserXHeaderNames.Gender, 'gender', v => (v === 'Female' ? GenderEnum.Female : GenderEnum.Male))
    assignValue(UserXHeaderNames.Language, 'language', v => v)
    assignValue(UserXHeaderNames.OriginalAdmissionDate, 'originalAdmissionDate', handleDate)
    assignValue(UserXHeaderNames.AdmissionDate, 'admissionDate', handleDate)
    assignValue(UserXHeaderNames.Affiliate, 'affiliate', v => v)
    assignValue(UserXHeaderNames.Registered, 'registered', v => v.toLocaleLowerCase().trim() === 'registered')
    assignValue(UserXHeaderNames.SecondaryEmail, 'secondaryEmail', v => v)
    assignValue(UserXHeaderNames.Email, 'email', v => v)
    assignValue(UserXHeaderNames.CountryCode, 'countryCode', v => v)
    assignValue(UserXHeaderNames.Phone, 'phone', v => v)
    assignValue(UserXHeaderNames.AddressLine1, 'addressLine1', v => v)
    assignValue(UserXHeaderNames.AddressLine2, 'addressLine2', v => v)
    assignValue(UserXHeaderNames.AddressLine3, 'addressLine3', v => v)
    assignValue(UserXHeaderNames.City, 'city', v => v)
    assignValue(UserXHeaderNames.State, 'state', v => v)
    assignValue(UserXHeaderNames.Province, 'province', v => v)
    assignValue(UserXHeaderNames.Country, 'country', v => v)
    assignValue(UserXHeaderNames.PostalCode, 'postalCode', v => v)
    assignValue(UserXHeaderNames.PostalStamp, 'postalStamp', v => v)

    function handleClub(v: string) {
      const end = v.lastIndexOf('(')
      const found = v.substring(end + 1, v.lastIndexOf(')'))
      const clubId = clubs.find(({code}) => code === found)!._id
      return new Types.ObjectId(clubId) as any
    }
    function isOf(key: UserXHeaderNames) {
      const val = w && typeof w === 'string' ? w.trim() : w
      return letter === headers[key] && !!val
    }
    function assignValue<T extends TUserDto>(
      key: UserXHeaderNames,
      prop: keyof T,
      map: (val: string) => T[typeof prop],
    ) {
      if (isOf(key)) {
        members[row][prop] = map(w)
      }
    }
  })

  return Object.values(members)

  function assignHeader(key: UserXHeaderNames, value: string) {
    headers[key] = value
  }
}

const initUser = (): TUserDto =>
  ({
    admissionDate: new Date().toISOString(),
    country: 'Ecuador',
    club: '',
    countryCode: '593',
    district: '4400',
    email: 'CHANGE_ME',
    firstName: '',
    fullName: '',
    gender: GenderEnum.Male,
    identification: '',
    lastName: '',
    registered: false,
    memberId: '',
  } as Exclude<TUserDto, null | undefined>)

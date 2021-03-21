import {HttpError, HttpStatus, r, use} from '@marblejs/core'
import {multipart$} from '@marblejs/middleware-multipart'
import {UserDao} from '@routes/user/model/user.dao'
import {ignoreDuplicates} from '@util/error.util'
import {TSheet, numbersRegex, onlyLettersRegex} from '@util/xlsx.util'
import {RoleTitleEnum, RoleXHeaderNames} from 'interfaces/TRole.type'
import {from} from 'rxjs'
import {catchError, concatMap, filter, map, mergeMap, toArray} from 'rxjs/operators'
import xlsx from 'xlsx'

import {RoleDao} from '../model/role.dao'
import {TRoleAssign} from '../model/role.dto'

export const assignRoles$ = r.pipe(
  r.matchPath('/assign'),
  r.matchType('PUT'),
  r.useEffect(req$ => {
    return req$.pipe(
      use(multipart$({maxFieldCount: 1, files: ['roles']})),
      map(req => xlsx.read(req.files['roles'].buffer, {type: 'buffer'})),
      map(formatXLSX),
      concatMap(roles =>
        // iterate through each role
        from(roles).pipe(
          mergeMap(role =>
            UserDao.findByName(role.name).pipe(
              // remove not found users
              filter(user => user !== null),
              mergeMap(user =>
                RoleDao.create(role, user!._id).pipe(
                  // update user with role
                  mergeMap(r => UserDao.updateRole(user!._id, r._id)),
                ),
              ),
            ),
          ),
          // rejoin to array
          toArray(),
        ),
      ),
      map(body => ({
        body,
      })),
      catchError(ignoreDuplicates),
    )
  }),
)

const formatXLSX = (doc: xlsx.WorkBook) => {
  // console.info(doc)
  const [sheetName1, sheetName2] = doc.SheetNames
  const sheet1 = doc.Sheets[sheetName1]
  const sheet2 = doc.Sheets[sheetName2]
  if (!sheet1 || !sheet2) {
    throw new HttpError('No sheets available', HttpStatus.NO_CONTENT)
  }

  return [...assign(sheet1), ...assign(sheet2)].filter(({name}) => !!name.trim())
}

const assign = (sheet: xlsx.WorkSheet) => {
  const headers: {[key in keyof typeof RoleXHeaderNames]: string} = {} as any
  const members: {[key: number]: TRoleAssign} = {}
  const keys = Object.keys(sheet).filter(key => key[0] !== '!')

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
      members[row] = initRole()
    }
    assignValue(RoleXHeaderNames.Role, 'title', v => v)
    assignValue(RoleXHeaderNames.Name, 'name', v => v)
    assignValue(RoleXHeaderNames.Reported, 'period', v => v)

    function isOf(key: RoleXHeaderNames) {
      const val = w && typeof w === 'string' ? w.trim() : w
      let validTitle = true
      if (key === RoleXHeaderNames.Role) {
        validTitle = Object.values(RoleTitleEnum).some(x => x === w)
      }
      if (key === RoleXHeaderNames.Name) {
        validTitle = !(w === 'Information Not Reported')
      }
      return letter === headers[key] && !!val && validTitle
    }
    function assignValue<T extends TRoleAssign>(
      key: RoleXHeaderNames,
      prop: keyof T,
      map: (val: string) => T[typeof prop],
    ) {
      if (isOf(key)) {
        members[row][prop] = map(w)
      }
    }
  })

  return Object.values(members)

  function assignHeader(key: RoleXHeaderNames, value: string) {
    headers[key as any] = value
  }
}

const initRole = (): TRoleAssign => ({
  active: true,
  period: 'N/A',
  title: RoleTitleEnum.ClubPresident,
  name: '',
})

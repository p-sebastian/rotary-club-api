import {t} from '@marblejs/middleware-io'

export const ClubValidator = Object.freeze({
  importXLSX: t.type({}),
})

export type TClubImportXLSX = t.TypeOf<typeof ClubValidator.importXLSX>

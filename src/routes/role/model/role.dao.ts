import {from} from 'rxjs'

import {TRoleCreate} from './role.dto'
import {RoleModel} from './role.model'

export const RoleDao = Object.freeze({
  create: (role: TRoleCreate, user: string) => from(RoleModel.create({...role, user})),
})

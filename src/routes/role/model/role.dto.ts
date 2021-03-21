import {t} from '@marblejs/middleware-io'
import {optional} from '@util/optional.util'
import {RoleTitleEnum} from 'interfaces/TRole.type'

export const RoleDto = Object.freeze({
  create: t.type({
    title: t.union([
      t.literal(RoleTitleEnum.AssistantGovernor),
      t.literal(RoleTitleEnum.ClubPresident),
      t.literal(RoleTitleEnum.RotaractAdvisor),
      t.literal(RoleTitleEnum.RotaractPresident),
    ]),
    active: t.boolean,
    period: optional(t.string),
  }),
  assign: t.type({
    title: t.union([
      t.literal(RoleTitleEnum.AssistantGovernor),
      t.literal(RoleTitleEnum.ClubPresident),
      t.literal(RoleTitleEnum.RotaractAdvisor),
      t.literal(RoleTitleEnum.RotaractPresident),
    ]),
    active: t.boolean,
    period: optional(t.string),
    name: t.string,
  }),
})

export type TRoleCreate = t.TypeOf<typeof RoleDto.create>
export type TRoleAssign = t.TypeOf<typeof RoleDto.assign>

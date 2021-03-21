import {User} from '@routes/user/model/user.model'
import {Ref, getModelForClass, prop} from '@typegoose/typegoose'
import {RoleTitleEnum} from 'interfaces/TRole.type'

export class Role {
  @prop({required: true})
  public title!: RoleTitleEnum

  @prop({required: true})
  public active!: boolean

  @prop()
  public period?: string // 2020-2021

  @prop({required: true, ref: 'User'})
  public user!: Ref<User>
}

export const RoleModel = getModelForClass(Role)

export const ROLE_TITLE_FIELDS = {
  __v: 0,
  _id: 0,
  active: 0,
  period: 0,
  user: 0,
}

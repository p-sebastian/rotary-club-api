import {getModelForClass, prop} from '@typegoose/typegoose'
import {ClubTypeEnum} from 'interfaces/TClub.type'

export class Club {
  @prop({required: true})
  public name!: string

  @prop({required: true})
  public foundedOn!: string

  @prop({required: true, unique: true})
  public code!: string

  @prop({required: true})
  public active!: boolean

  @prop({required: true})
  public type!: ClubTypeEnum
}

export const ClubModel = getModelForClass(Club)
export const CLUB_CODE_FIELDS = {
  code: 1,
}
export const CLUB_POPULATE_FIELDS = {
  __v: 0,
  foundedOn: 0,
  active: 0,
}
export const CLUB_ALL_POPULATE_FIELDS = {
  __v: 0,
  active: 0,
}

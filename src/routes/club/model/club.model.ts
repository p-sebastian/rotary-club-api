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

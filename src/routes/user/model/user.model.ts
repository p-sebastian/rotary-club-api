import {Club} from '@routes/club/model/club.model'
import {Ref, getModelForClass, prop, types} from '@typegoose/typegoose'
import {GenderEnum} from 'interfaces/TUser.type'

export class User {
  @prop({unique: true})
  public sub?: string

  @prop({required: true})
  public district!: string

  @prop({required: true, unique: true})
  public identification!: string

  @prop({required: true, ref: 'Club'})
  public club!: Ref<Club>

  @prop()
  public birthday?: Date

  @prop()
  public profession?: string

  @prop()
  public activity?: string

  @prop({unique: true})
  public memberId?: string

  @prop({required: true})
  public fullName!: string

  @prop()
  public prefix?: string

  @prop({required: true})
  public firstName!: string

  @prop()
  public middleName?: string

  @prop({required: true})
  public lastName!: string

  @prop()
  public suffix?: string

  @prop({required: true, enum: GenderEnum})
  public gender!: GenderEnum

  @prop()
  public language?: string

  @prop()
  public originalAdmissionDate?: Date

  @prop({required: true})
  public admissionDate!: Date

  @prop()
  public affiliate?: string

  @prop({required: true})
  public registered!: boolean

  @prop({required: true, unique: true})
  public email!: string

  @prop()
  public secondaryEmail?: string

  @prop({required: true})
  public countryCode!: number

  @prop()
  public phone?: string

  @prop()
  public addressLine1?: string

  @prop()
  public addressLine2?: string

  @prop()
  public addressLine3?: string

  @prop()
  public city?: string

  @prop()
  public state?: string

  @prop()
  public province?: string

  @prop({required: true})
  public country!: string

  @prop()
  public postalCode?: string

  @prop()
  public postalStamp?: string
}

export const UserModel = getModelForClass(User)
export type TUser = types.Ref<User>

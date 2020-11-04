import {getModelForClass, prop} from '@typegoose/typegoose'

export class User {
  @prop({required: true, unique: true})
  public sub!: string

  @prop({required: true, unique: true})
  public email!: string
}

export const UserModel = getModelForClass(User)

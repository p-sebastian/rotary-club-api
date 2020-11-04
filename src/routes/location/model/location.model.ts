import {getModelForClass, prop} from '@typegoose/typegoose'

export class Location {
  @prop({required: true})
  public name!: string

  @prop({required: true})
  public latitude!: number

  @prop({required: true})
  public longitude!: number
}

export const LocationModel = getModelForClass(Location)

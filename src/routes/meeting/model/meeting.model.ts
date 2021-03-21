import {Club} from '@routes/club/model/club.model'
import {User} from '@routes/user/model/user.model'
import {Ref, getModelForClass, prop} from '@typegoose/typegoose'

export class Meeting {
  @prop({required: true})
  public name!: string

  @prop({required: true})
  public startDate!: Date

  @prop({required: true})
  public duration!: number // in hours

  @prop({required: true, ref: 'User'})
  public members!: Ref<User>[]

  @prop({required: true, ref: 'Club'})
  public club!: Ref<Club>
}

export const MeetingModel = getModelForClass(Meeting)

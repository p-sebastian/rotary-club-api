import {Club} from '@routes/club/model/club.model'
import {User} from '@routes/user/model/user.model'
import {Ref, getModelForClass, prop} from '@typegoose/typegoose'

export class Project {
  @prop({required: true})
  public name!: string

  @prop({required: true})
  public startDate!: Date

  @prop({required: true})
  public endDate!: Date

  @prop({required: true, ref: 'Club'})
  public club!: Ref<Club>

  @prop({required: true, ref: 'User'})
  public members!: Ref<User>[]

  @prop({required: true})
  public benefactorAmount!: number

  @prop({required: true})
  public budget!: number

  @prop({required: true})
  public amountGathered!: number // money

  @prop({required: true})
  public duration!: number // in hours

  @prop({required: true})
  public volunteerHours!: number // in hours

  @prop({required: true})
  public numberOfVolunteers!: number

  @prop()
  public otherInstructions?: string
}

export const ProjectModel = getModelForClass(Project)

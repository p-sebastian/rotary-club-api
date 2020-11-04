import {from} from 'rxjs'

import {UserModel} from './user.model'
import {TUserCreate} from './user.validator'

export const UserDao = Object.freeze({
  findAll: () => from(UserModel.find().exec()),
  findUserBySub: (sub: string) => from(UserModel.findOne({sub}).exec()),
  create: (user: TUserCreate) => from(UserModel.create(user)),
})

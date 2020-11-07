import {from} from 'rxjs'

import {TUserDto} from './user.dto'
import {UserModel} from './user.model'

export const UserDao = Object.freeze({
  findAll: () => from(UserModel.find().exec()),
  findUserBySub: (sub: string) => from(UserModel.findOne({sub}).exec()),
  create: (user: TUserDto) => from(UserModel.create(user)),
  createMultiple: (docs: TUserDto[]) => from(UserModel.insertMany(docs, {ordered: false})),
})

import {CLUB_POPULATE_FIELDS} from '@routes/club/model/club.model'
import {from} from 'rxjs'

import {TUserDto, TUserRegisterDto} from './user.dto'
import {USER_PUBLIC_FIELDS, UserModel} from './user.model'

export const UserDao = Object.freeze({
  findAll: () => from(UserModel.find().populate('club', CLUB_POPULATE_FIELDS).select(USER_PUBLIC_FIELDS).exec()),
  findUserBySub: (sub: string) => from(UserModel.findOne({sub}).exec()),
  register: (identification: string, user: Partial<TUserRegisterDto>) =>
    from(UserModel.findOneAndUpdate({identification}, user as any).exec()),
  verifyUser: (identification: string) =>
    from(UserModel.findOne({identification}).populate('club', CLUB_POPULATE_FIELDS).exec()),
  create: (user: TUserDto) => from(UserModel.create(user)),
  createMultiple: (docs: TUserDto[]) => from(UserModel.insertMany(docs, {ordered: false})),
})

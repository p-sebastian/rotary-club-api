import {CLUB_POPULATE_FIELDS} from '@routes/club/model/club.model'
import {ROLE_TITLE_FIELDS} from '@routes/role/model/role.model'
import {Types} from 'mongoose'
import {from} from 'rxjs'

import {TUserDto, TUserFilterDTO, TUserRegisterDto} from './user.dto'
import {USER_ID_FIELD, USER_PUBLIC_FIELDS, UserModel} from './user.model'

export const UserDao = Object.freeze({
  findAll: () => from(UserModel.find().populate('club', CLUB_POPULATE_FIELDS).select(USER_PUBLIC_FIELDS).exec()),

  findByName: (fullName: string) => from(UserModel.findOne({fullName}).select(USER_ID_FIELD).exec()),

  findUserBySub: (sub: string) => from(UserModel.findOne({sub}).populate('club', CLUB_POPULATE_FIELDS).exec()),

  register: (identification: string, user: Partial<TUserRegisterDto>) =>
    from(UserModel.findOneAndUpdate({identification}, user as any).exec()),

  updateRole: (_id: string, role: string) =>
    from(
      UserModel.findByIdAndUpdate(_id, {role: Types.ObjectId(role)})
        .select(USER_ID_FIELD)
        .exec(),
    ),

  verifyUser: (identification: string) =>
    from(UserModel.findOne({identification}).populate('club', CLUB_POPULATE_FIELDS).exec()),

  create: (user: TUserDto) => from(UserModel.create(user)),

  createMultiple: (docs: TUserDto[]) => from(UserModel.insertMany(docs, {ordered: false})),

  filter: (by: TUserFilterDTO) =>
    from(
      UserModel.find({club: {$in: by.club}})
        .populate(by.type ? {path: 'club', select: 'type', type: {$eq: by.type}} : {path: 'club'})
        .select({_id: 1})
        .distinct('_id')
        .exec(),
    ),

  allUsersOfClub: (by: string) =>
    from(
      UserModel.find({club: {$in: [by]}})
        .populate('club', CLUB_POPULATE_FIELDS)
        .populate('role', ROLE_TITLE_FIELDS)
        .select(USER_PUBLIC_FIELDS)
        .exec(),
    ),
})

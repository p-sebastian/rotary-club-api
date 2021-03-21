import {CLUB_POPULATE_FIELDS} from '@routes/club/model/club.model'
import {USER_PUBLIC_FIELDS} from '@routes/user/model/user.model'
import {from} from 'rxjs'

import {TMeetingCreate} from './meeting.dto'
import {MeetingModel} from './meeting.model'

export const MeetingDao = Object.freeze({
  findAll: () => from(MeetingModel.find().exec()),

  findByClub: (club: string) =>
    from(
      MeetingModel.find({club: {$in: [club]}})
        .populate('club', CLUB_POPULATE_FIELDS)
        .populate('members', USER_PUBLIC_FIELDS)
        .exec(),
    ),

  create: (meeting: TMeetingCreate) => from(new MeetingModel(meeting).save()),
})

import {TClub} from 'interfaces/TClub.type'
import {from} from 'rxjs'

import {CLUB_ALL_POPULATE_FIELDS, CLUB_CODE_FIELDS, ClubModel} from './club.model'

export const ClubDao = Object.freeze({
  findAll: () =>
    from(
      ClubModel.find({active: {$eq: true}})
        .select(CLUB_ALL_POPULATE_FIELDS)
        .exec(),
    ),
  createMultiple: (docs: TClub[]) => from(ClubModel.insertMany(docs, {ordered: false})),
  findAllCodeOnly: () => from(ClubModel.find().select(CLUB_CODE_FIELDS).exec()),
})

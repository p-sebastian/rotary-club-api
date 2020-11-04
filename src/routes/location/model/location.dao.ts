import {from} from 'rxjs'

import {LocationModel} from './location.model'
import {TLocationCreate} from './location.validator'

export const LocationDao = Object.freeze({
  findAll: () => from(LocationModel.find().exec()),
  findById: (id: string) => from(LocationModel.findById(id).exec()),
  create: (location: TLocationCreate) => from(new LocationModel(location).save()),
})

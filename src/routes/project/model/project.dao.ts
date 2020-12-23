import {CLUB_POPULATE_FIELDS} from '@routes/club/model/club.model'
import {from} from 'rxjs'

import {TProjectCreate} from './project.dto'
import {ProjectModel} from './project.model'

export const ProjectDao = Object.freeze({
  findAll: () => from(ProjectModel.find().populate('club', CLUB_POPULATE_FIELDS).exec()),
  create: ({_id: _, ...project}: TProjectCreate) => from(new ProjectModel(project).save()),
})

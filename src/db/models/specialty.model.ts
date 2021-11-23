import { DB_FILEPATH } from '../constants';
import { FileModel } from './file.model'


export const SpecialitiesModel = new FileModel(DB_FILEPATH, 'specialties');

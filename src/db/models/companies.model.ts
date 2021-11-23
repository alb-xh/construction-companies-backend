import { DB_FILEPATH } from '../constants';
import { FileModel } from './file.model'


export const CompaniesModel = new FileModel(DB_FILEPATH, 'companies');

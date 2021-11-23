import { App } from '../../lib';
import {
  specialtiesRoute,
  companiesRoute,
} from './routes';


export const v1App = new App([
  specialtiesRoute,
  companiesRoute,
]);

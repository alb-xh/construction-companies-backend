import { getSpecialtiesController } from './controllers';
import { Route } from '../../../../lib';


export const specialtiesRoute = new Route('/specialties')
  .get(getSpecialtiesController);

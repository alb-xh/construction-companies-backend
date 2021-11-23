import { Route } from '../../../../lib';
import { getCompaniesController } from './controllers';


export const companiesRoute = new Route('/companies')
  .get(getCompaniesController);

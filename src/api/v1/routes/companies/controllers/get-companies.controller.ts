import { Controller } from '../../../../../lib';
import { CompaniesModel, AndQueryCondition } from '../../../../../db';


// TODO: add proper validation middleware, and setup cors domain
export const getCompaniesController = new Controller(async (req, res) => {
  const { name, specialties, limit = 10, offset = 0 } = req.query;

  const badRequest = (message: string): void => {
    res
      .status(400)
      .send(message);
  }

  if (Number.isNaN(+limit) || limit < 1 || limit > 50) {
    badRequest('Invalid limit!');
    return;
  }

  if (Number.isNaN(+offset) || offset < 0) {
    badRequest('Invalid offset!');
    return;
  }

  const query: AndQueryCondition = {
    and: [],
  };

  if (name) {
    if (typeof name !== 'string') {
      badRequest('Invalid name!');
      return;
    }

    query.and.push({ name: { like: new RegExp(`^${name}.+`, 'i') }});
  }

  if (specialties) {
    if (
      !Array.isArray(specialties) ||
      specialties.some((el) => typeof el !== 'string')
    ) {
      badRequest('Invalid specialties!');
      return;
    }

    query.and.push({ specialty: { in: <string[]>specialties } });
  }

  const count = (await CompaniesModel.find()).length;
  const companies = await CompaniesModel.find(query, {
    offset: <number>offset,
    limit: <number>limit,
  });

  res
    .status(200)
    .send({ count, companies });
});

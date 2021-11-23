import { Controller } from '../../../../../lib';
import { SpecialitiesModel } from '../../../../../db';


export const getSpecialtiesController = new Controller(async (req, res) => {
  const specialties = await SpecialitiesModel.find();
  res.send(specialties);
});

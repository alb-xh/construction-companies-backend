import fs from 'fs/promises';
import faker from 'faker';

import { SPECIALTIES, DB_FILEPATH } from '../constants';



const ENTRIES = 2000;

function pickRandomFromArray<T> (arr: T[]): T {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

const getNewDbDate = (): Record<string, unknown> => {
  const getNewCompany = () => ({
    name: faker.company.companyName(),
    city: faker.address.cityName(),
    specialty: pickRandomFromArray<string>(SPECIALTIES),
    logo: {
      src: faker.image.business(260, 170),
      alt: faker.lorem.sentence(),
    }
  });

  const specialties = SPECIALTIES;
  const companies = [ ...Array(ENTRIES) ].map(getNewCompany);

  return {
    specialties,
    companies,
  };
}

const writeToDb = async (filepath: string, data: Record<string, unknown>): Promise<void> => {
  const str = JSON.stringify(data, null, 2);

  await fs.writeFile(filepath, str);
}

const popullateDb = async (): Promise<void> => {
  const data = getNewDbDate();
  await writeToDb(DB_FILEPATH, data);
};

popullateDb();

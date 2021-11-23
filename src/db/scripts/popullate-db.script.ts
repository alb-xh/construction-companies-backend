import fs from 'fs/promises';
import faker from 'faker';

import { SPECIALTIES, DB_FILEPATH } from '../constants';


const ENTRIES = 2000;

function pickRandomFromArray<T> (arr: T[]): T {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

function findCompanyName (): string {
  let name = faker.company.companyName();
  while (name.length > 15) {
    name = faker.company.companyName();
  }

  return name;
}

const getNewDbDate = (): Record<string, unknown> => {
  const getNewCompany = () => ({
    name: findCompanyName(),
    city: faker.address.cityName(),
    specialty: pickRandomFromArray<string>(SPECIALTIES),
    logo: {
      src: `https://picsum.photos/120/90?id=${faker.datatype.uuid()}`,
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

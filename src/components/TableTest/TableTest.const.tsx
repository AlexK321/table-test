import { createColumnHelper } from '@tanstack/react-table';

import { ServerProgress } from '../ServerProgress';

export type Person = {
  name: string;
  city: string;
  cellPhone: string;
  country: string;
  salary: string;
};

export const TABLE_DATA = [
  {
    name: 'Alex',
    city: 'Deli',
    cellPhone: '+11111111111',
    country: 'India',
    salary: '200',
  },
  {
    name: 'Boris',
    city: 'Minsk',
    cellPhone: '+11111113311',
    country: 'Belarus',
    salary: '300',
  },
  {
    name: 'Ylya',
    city: 'Moscow',
    cellPhone: '+1111141111',
    country: 'Russia',
    salary: '400',
  },
];

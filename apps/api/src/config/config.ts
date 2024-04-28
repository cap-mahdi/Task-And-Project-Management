import { Configuration } from './validate';

export const configuration = (): Configuration => {
  console.log('database_url', process.env.DATABASE_URL);
  return {
    database_url: process.env.DATABASE_URL,
  };
};

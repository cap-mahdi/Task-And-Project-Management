export enum EnvVariables {
  DATABASE_URL = 'DATABASE_URL',
  ACCESS_TOKEN_SECRET = 'ACCESS_TOKEN_SECRET',
}

export const databaseConfiguration = () => {
  return {
    [EnvVariables.DATABASE_URL]: process.env.DATABASE_URL,
  };
};

export const authConfiguration = () => {
  return {
    [EnvVariables.ACCESS_TOKEN_SECRET]: process.env.ACCESS_TOKEN_SECRET,
  };
};

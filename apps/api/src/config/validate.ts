import { IsString, MinLength, validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';

export class Configuration {
  @IsString()
  @MinLength(20)
  DATABASE_URL: string;

  @IsString()
  @MinLength(10)
  ACCESS_TOKEN_SECRET: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(Configuration, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    for (const error of errors) {
      for (const key in error.constraints) {
        console.error(error.constraints[key]);
      }
    }
    throw new Error('Config validation failed');
  }
  return validatedConfig;
}

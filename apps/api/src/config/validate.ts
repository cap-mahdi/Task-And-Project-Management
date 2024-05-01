import { IsString, validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';

export class Configuration {
  @IsString()
  database_url: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(Configuration, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}

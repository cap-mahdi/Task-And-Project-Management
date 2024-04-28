import { CreateUserInput } from '../graphql';
import { IsString, MinLength } from 'class-validator';
export class CreateUserInputDto implements CreateUserInput {
  @IsString()
  @MinLength(3)
  name: string;
  email: string;
  password: string;
}

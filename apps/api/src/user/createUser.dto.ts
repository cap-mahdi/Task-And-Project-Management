import { ApiProperty } from '@nestjs/swagger';
import { CreateUserInput } from '../graphql';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
export class CreateUserInputDto implements CreateUserInput {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  email: string;
  @ApiProperty()
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  password: string;
}

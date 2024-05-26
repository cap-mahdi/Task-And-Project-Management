import { ArrayUnique, IsArray, IsString } from 'class-validator';
import { CreateTask } from '../graphql';

export class CreateTaskDto implements CreateTask {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayUnique()
  tags: string[];

  @IsArray()
  @IsString({ each: true })
  @ArrayUnique()
  assignees: string[];
}

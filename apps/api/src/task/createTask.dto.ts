import { ArrayUnique, IsArray, IsEnum, IsString } from 'class-validator';
import { CreateTask, Status } from '../graphql';

export class CreateTaskDto implements CreateTask {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  @IsEnum(Status)
  status: Status;
  @IsArray()
  @IsString({ each: true })
  @ArrayUnique()
  tags: string[];

  @IsArray()
  @IsString({ each: true })
  @ArrayUnique()
  assignees: string[];
}

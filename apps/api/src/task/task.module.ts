import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskResolver } from './task.resolver';
import { TaskService } from './task.service';
import {
  MilestoneSchema,
  TaskSchema,
  UserProjectSchema,
  UserSchema,
  UserTaskSchema,
} from '../entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MilestoneSchema,
      TaskSchema,
      UserTaskSchema,
      UserProjectSchema,
    ]),
  ],
  providers: [TaskResolver, TaskService],
  exports: [TaskService],
})
export class TaskModule {}

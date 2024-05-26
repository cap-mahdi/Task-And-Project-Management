import { Module } from '@nestjs/common';

import { UserTaskResolver } from './user-task.resolver';
import { UserTaskService } from './user-task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTaskSchema } from '../entities';

@Module({
  imports: [TypeOrmModule.forFeature([UserTaskSchema])],
  providers: [UserTaskResolver, UserTaskService],
  exports: [UserTaskService],
})
export class UserTaskModule {}

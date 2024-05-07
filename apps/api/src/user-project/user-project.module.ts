import { Module } from '@nestjs/common';
import { UserProjectResolver } from './user-project.resolver';
import { UserProjectService } from './user-project.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProjectSchema } from '../entities';

@Module({
  imports: [TypeOrmModule.forFeature([UserProjectSchema])],
  providers: [UserProjectResolver, UserProjectService],
  exports: [UserProjectService],
})
export class UserProjectModule { }

import { Module } from '@nestjs/common';
import { UserProjectResolver } from './user-project.resolver';
import { WorkspaceSchema, UserWorkspaceSchema, UserSchema, ProjectSchema, UserProjectSchema } from '../entities';
import { UserProjectService } from './user-project.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      WorkspaceSchema,
      UserWorkspaceSchema,
      UserSchema,
      ProjectSchema,
      UserProjectSchema,
    ]),
  ],
  providers: [UserProjectResolver, UserProjectService],
  exports: [UserProjectService],
})
export class UserProjectModule { }

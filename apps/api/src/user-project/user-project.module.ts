import { Module } from '@nestjs/common';
import { UserProjectResolver } from './user-project.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkspaceSchema, UserWorkspaceSchema, UserSchema, ProjectSchema, UserProjectSchema } from '../entities';

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
  providers: [UserProjectResolver]
})
export class UserProjectModule { }

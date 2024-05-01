import { Module } from '@nestjs/common';
import { UserWorkspaceResolver } from './user-workspace.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkspaceSchema } from '../entities/workspace.entity';
import { UserWorkspaceSchema } from '../entities/userWorkspace.entity';
import { UserSchema } from '../entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      WorkspaceSchema,
      UserWorkspaceSchema,
      UserSchema,
    ]),
  ],
  providers: [UserWorkspaceResolver],
})
export class UserWorkspaceModule {}

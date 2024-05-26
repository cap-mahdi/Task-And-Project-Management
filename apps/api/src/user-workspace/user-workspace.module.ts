import { Module, forwardRef } from '@nestjs/common';
import { UserWorkspaceResolver } from './user-workspace.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkspaceSchema } from '../entities/workspace.entity';
import { UserWorkspaceSchema } from '../entities/userWorkspace.entity';
import { UserSchema } from '../entities/user.entity';
import { ProjectSchema, UserProjectSchema } from '../entities';
import { UserWorkspaceService } from './user-workspace.service';
import { ProjectModule } from '../project/project.module';
import { UserProjectModule } from '../user-project/user-project.module';
import { UserModule } from '../user/user.module';
import { WorkspaceModule } from '../workspace/workspace.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      WorkspaceSchema,
      UserWorkspaceSchema,
      UserSchema,
      ProjectSchema,
      UserProjectSchema,
    ]),
    forwardRef(() => UserProjectModule),
    WorkspaceModule,
    ProjectModule,
    forwardRef(() => UserModule),
  ],
  providers: [UserWorkspaceResolver, UserWorkspaceService],
  exports: [UserWorkspaceService],
})
export class UserWorkspaceModule { }

import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkspaceSchema } from '../entities/workspace.entity';
import { UserWorkspaceSchema } from '../entities/userWorkspace.entity';
import { WorkspaceResolver } from './workspace.resolver';
import { WorkspaceService } from './workspace.service';
import { ProjectModule } from '../project/project.module';
import { UserProjectModule } from '../user-project/user-project.module';
import { UserModule } from '../user/user.module';
import { UserWorkspaceModule } from '../user-workspace/user-workspace.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([WorkspaceSchema, UserWorkspaceSchema]),
    forwardRef(() => UserProjectModule),
    forwardRef(() => UserWorkspaceModule),
    forwardRef(() => UserProjectModule),
    forwardRef(() => UserModule),
    forwardRef(() => ProjectModule),
    forwardRef(() => UserModule),
  ],
  providers: [WorkspaceResolver, WorkspaceService],
  exports: [WorkspaceService],
})
export class WorkspaceModule {}

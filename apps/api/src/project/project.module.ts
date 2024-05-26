import { Module, forwardRef } from '@nestjs/common';
import { ProjectResolver } from './project.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectSchema } from '../entities/project.entity';
import { UserProjectSchema } from '../entities/userProject.entity';
import { WorkspaceSchema } from '../entities/workspace.entity';
import { ProjectService } from './project.service';
import { UserWorkspaceSchema } from '../entities';
import { UserProjectModule } from '../user-project/user-project.module';
import { UserWorkspaceModule } from '../user-workspace/user-workspace.module';
import { UserModule } from '../user/user.module';
import { WorkspaceModule } from '../workspace/workspace.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProjectSchema,
      UserProjectSchema,
      WorkspaceSchema,
      UserWorkspaceSchema
    ]),
    forwardRef(() => UserProjectModule),
    forwardRef(() => UserWorkspaceModule),
    forwardRef(() => UserModule),
    forwardRef(() => WorkspaceModule),
  ],
  providers: [ProjectResolver, ProjectService],
  exports: [ProjectService],
})
export class ProjectModule { }

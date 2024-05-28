import { Module, forwardRef } from '@nestjs/common';
import { UserProjectResolver } from './user-project.resolver';
import { WorkspaceSchema, UserWorkspaceSchema, UserSchema, ProjectSchema, UserProjectSchema } from '../entities';
import { UserProjectService } from './user-project.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectModule } from '../project/project.module';
import { UserWorkspaceModule } from '../user-workspace/user-workspace.module';
import { WorkspaceModule } from '../workspace/workspace.module';
import { UserModule } from '../user/user.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      WorkspaceSchema,
      UserWorkspaceSchema,
      UserSchema,
      ProjectSchema,
      UserProjectSchema,
    ]),
    forwardRef(() => UserWorkspaceModule),
    forwardRef(() => WorkspaceModule),
    forwardRef(() => ProjectModule),
    forwardRef(() => UserModule),
    EventEmitterModule.forRoot(),
  ],
  providers: [UserProjectResolver, UserProjectService],
  exports: [UserProjectService],
})
export class UserProjectModule { }

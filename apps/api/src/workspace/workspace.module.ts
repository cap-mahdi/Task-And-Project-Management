import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkspaceSchema } from '../entities/workspace.entity';
import { UserWorkspaceSchema } from '../entities/userWorkspace.entity';
import { WorkspaceResolver } from './workspace.resolver';
import { WorkspaceService } from './workspace.service';
import { ProjectSchema } from '../entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      WorkspaceSchema,
      UserWorkspaceSchema,
      ProjectSchema,
    ]),
  ],
  providers: [WorkspaceResolver, WorkspaceService],
  exports: [WorkspaceService],
})
export class WorkspaceModule {}

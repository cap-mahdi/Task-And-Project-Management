import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkspaceSchema } from '../entities/workspace.entity';
import { UserWorkspaceSchema } from '../entities/userWorkspace.entity';

@Module({
  // imports: [TypeOrmModule.forFeature([WorkspaceSchema, UserWorkspaceSchema])],
})
export class WorkspaceModule {}

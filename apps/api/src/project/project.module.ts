import { Module } from '@nestjs/common';
import { ProjectResolver } from './project.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectSchema } from '../entities/project.entity';
import { UserProjectSchema } from '../entities/userProject.entity';
import { WorkspaceSchema } from '../entities/workspace.entity';
import { ProjectService } from './project.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProjectSchema,
      UserProjectSchema,
      WorkspaceSchema,
    ]),
  ],
  providers: [ProjectResolver, ProjectService],
  exports: [ProjectService],
})
export class ProjectModule { }

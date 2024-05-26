import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MilestoneResolver } from './milestone.resolver';
import { MilestoneService } from './milestone.service';
import { MilestoneSchema, ProjectSchema, UserProjectSchema } from '../entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MilestoneSchema,
      ProjectSchema,
      UserProjectSchema,
    ]),
  ],
  providers: [MilestoneResolver, MilestoneService],
  exports: [MilestoneService],
})
export class MilestoneModule {}

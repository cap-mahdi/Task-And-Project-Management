import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentResolver } from './comment.resolver';
import { TaskModule } from '../task/task.module';
import { MilestoneModule } from '../milestone/milestone.module';
import { UserProjectModule } from '../user-project/user-project.module';
import { CommentSchema } from '../entities';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentSchema]),
    TaskModule,
    MilestoneModule,
    UserProjectModule,
  ],
  controllers: [CommentController],
  providers: [CommentResolver, CommentService],
  exports: [CommentService],
})
export class CommentModule {}

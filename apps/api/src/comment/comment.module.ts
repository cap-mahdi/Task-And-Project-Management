import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentResolver } from './comment.resolver';
import { TaskModule } from '../task/task.module';

@Module({
  imports: [TypeOrmModule.forFeature([]), TaskModule],
  providers: [CommentResolver, CommentService],
  exports: [CommentService],
})
export class CommentModule {}

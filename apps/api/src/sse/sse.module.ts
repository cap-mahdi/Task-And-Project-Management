import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { CommentModule } from '../comment/comment.module';
import { sseController } from './sse.controller';
import { sseService } from './sse.service';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [UserModule, CommentModule, EventEmitterModule.forRoot()],
  controllers: [sseController],
  providers: [sseService],
  exports: [sseService],
})
export class sseModule {}

import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { RoomModule } from '../room/room.module';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageSchema, UserSchema } from '../entities';
import { MessageResolver } from './message.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([MessageSchema, UserSchema]),
    RoomModule,
    UserModule,
  ],
  providers: [MessageService, MessageResolver],
  exports: [MessageService],
})
export class MessageModule {}

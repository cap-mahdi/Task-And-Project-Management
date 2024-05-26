import { Module } from '@nestjs/common';
import { UserRoomService } from './user-room.service';
import { UserRoomResolver } from './user-room.resolver';
// import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ProjectSchema,
  RoomSchema,
  UserProjectSchema,
  UserRoomSchema,
  UserSchema,
} from '../entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRoomSchema,
      UserSchema,
      RoomSchema,
      UserProjectSchema,
    ]),
  ],
  providers: [UserRoomService, UserRoomResolver],
  exports: [UserRoomService],
})
export class UserRoomModule {}

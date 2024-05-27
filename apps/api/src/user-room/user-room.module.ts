import { Module } from '@nestjs/common';
import { UserRoomService } from './user-room.service';
import { UserRoomResolver } from './user-room.resolver';
// import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  RoomSchema,
  UserProjectSchema,
  UserRoomSchema,
  UserSchema,
} from '../entities';
import { RoomService } from '../room/room.service';

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

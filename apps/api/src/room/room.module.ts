import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomResolver } from './room.resolver';
import { Type } from 'class-transformer';
import { ProjectSchema, RoomSchema, UserRoomSchema } from '../entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRoomModule } from '../user-room/user-room.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoomSchema, ProjectSchema, UserRoomSchema]),
    UserRoomModule,
  ],
  providers: [RoomService, RoomResolver],
  exports: [RoomService],
})
export class RoomModule {}

import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomResolver } from './room.resolver';
import { Type } from 'class-transformer';
import { ProjectSchema, RoomSchema, UserRoomSchema } from '../entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoomSchema, ProjectSchema, UserRoomSchema]),
  ],
  providers: [RoomService, RoomResolver],
  exports: [RoomService],
})
export class RoomModule {}

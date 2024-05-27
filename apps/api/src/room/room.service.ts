import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ProjectSchema,
  RoomSchema,
  UserRoomSchema,
  UserSchema,
} from '../entities';
import { FindManyOptions, Repository } from 'typeorm';
import { UserRoomService } from '../user-room/user-room.service';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(RoomSchema)
    private readonly roomRepository: Repository<RoomSchema>,
    @InjectRepository(ProjectSchema)
    private readonly projectRepository: Repository<ProjectSchema>,
    @InjectRepository(UserRoomSchema)
    private readonly userRoomRepository: Repository<UserRoomSchema>,
    private readonly userRoomService: UserRoomService
  ) {}

  async createRoom(
    projectId: string,
    name: string,
    user: UserSchema,
    members: [string]
  ) {
    const project = await this.projectRepository.findOne({
      where: {
        id: projectId,
      },
    });
    if (!project) {
      throw new NotFoundException('Project not found');
    }

    const roomExist = await this.roomRepository.findOne({
      where: {
        name,
        project: { id: projectId },
      },
    });

    if (roomExist) {
      await this.userRoomService.addUserToRoom(roomExist.id, members, user);
      return roomExist;
    }

    const room = new RoomSchema();
    room.project = project;
    room.name = name;

    const newroom: RoomSchema = await this.roomRepository.save(room);

    await this.userRoomRepository.save({
      user,
      room: newroom,
    });

    await this.userRoomService.addUserToRoom(newroom.id, members, user);

    return newroom;
  }

  async getRoomById(roomId: string) {
    const room = await this.roomRepository.findOne({
      where: { id: roomId },
    });
    if (!room) {
      throw new NotFoundException('Room not found');
    }
    return room;
  }

  async find(option?: FindManyOptions<RoomSchema>) {
    return this.roomRepository.find(option);
  }

  async findOne(option?: FindManyOptions<RoomSchema>) {
    return this.roomRepository.findOne(option);
  }
}

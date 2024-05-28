import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  MessageSchema,
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
    @InjectRepository(MessageSchema)
    private readonly messageRepository: Repository<MessageSchema>,
    private readonly userRoomService: UserRoomService
  ) {}

  async getMessages(roomId: string) {
    const messages = await this.messageRepository.find({
      where: { room: { id: roomId } },
      withDeleted: true,
      order: { createdAt: 'ASC' },
    });
    console.log('messages', messages);
    return messages;
  }
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

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  RoomSchema,
  UserProjectSchema,
  UserRoomSchema,
  UserSchema,
} from '../entities';
import { Repository } from 'typeorm';
import { ForbiddenError } from '@nestjs/apollo';
import { RoomService } from '../room/room.service';

@Injectable()
export class UserRoomService {
  constructor(
    @InjectRepository(UserRoomSchema)
    private readonly userRoomRepository: Repository<UserRoomSchema>,
    @InjectRepository(UserSchema)
    private readonly userRepository: Repository<UserSchema>,
    @InjectRepository(RoomSchema)
    private readonly roomRepository: Repository<RoomSchema>,
    @InjectRepository(UserProjectSchema)
    private readonly userProjectRepository: Repository<UserProjectSchema>
  ) {}

  async addUserToRoom(roomId: string, userId: [string], user: UserSchema) {
    const room = await this.roomRepository.findOne({
      where: {
        id: roomId,
      },
    });

    const userRoom = await this.userRoomRepository.findOne({
      where: {
        user: { id: user.id },
        room: { id: roomId },
      },
    });

    if (!userRoom) {
      throw new ForbiddenError('User not in the room');
    }

    const usersRoom: UserRoomSchema[] = [];
    for (const id of userId) {
      const user = await this.userRepository.findOne({
        where: {
          id,
        },
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const existUser = await this.userRoomRepository.findOne({
        where: {
          user: { id: id },
          room: { id: roomId },
        },
      });
      if (existUser) {
        throw new BadRequestException('User already in the room');
      }

      const userProjectIn = await this.userProjectRepository.findOne({
        where: {
          user: { id: id },
          project: room.project,
        },
      });

      if (!userProjectIn) {
        throw new ForbiddenError('User not in the project');
      }

      const userRoom = new UserRoomSchema();
      userRoom.user = user;
      userRoom.room = room;
      usersRoom.push(userRoom);
    }

    return this.userRoomRepository.save(usersRoom);
  }

  async getUserRoomsByUserIdAndProjectId(
    projectId: string,
    user: UserSchema
  ): Promise<RoomSchema[]> {
    const rooms = await this.roomRepository.find({
      where: {
        project: { id: projectId },
        userRooms: {
          user: { id: user.id },
        },
      },
      relations: ['userRooms'],
    });

    return rooms;
  }
}

import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import {
  RoomSchema,
  UserProjectSchema,
  UserRoomSchema,
  UserSchema,
} from '../entities';
import { Repository } from 'typeorm';
import {
  BadRequestException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { GraphQLAuthGaurd } from '../auth/guards/gql-auth-guard';
import { GetUserGQL } from '../auth/decorators/gql-user.decorator';
import { ForbiddenError } from '@nestjs/apollo';

@Resolver()
export class UserRoomResolver {
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

  @Mutation('addUserToRoom')
  @UseGuards(GraphQLAuthGaurd)
  async addUserToRoom(
    @Args('roomId') roomId: string,
    @Args('userId') userId: [string],
    @GetUserGQL() user: UserSchema
  ): Promise<UserRoomSchema[]> {
    const room = await this.roomRepository.findOne({
      where: {
        id: roomId,
      },
    });

    if (!room) {
      throw new NotFoundException('Room not found');
    }

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
}

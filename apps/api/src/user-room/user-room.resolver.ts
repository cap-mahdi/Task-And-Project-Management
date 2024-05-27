import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
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
import { UserRoomService } from './user-room.service';

@Resolver()
export class UserRoomResolver {
  constructor(private readonly userRoomService: UserRoomService) {}

  @Mutation('addUserToRoom')
  @UseGuards(GraphQLAuthGaurd)
  async addUserToRoom(
    @Args('roomId') roomId: string,
    @Args('userId') userId: [string], //new members to add to the room
    @GetUserGQL() user: UserSchema //current user -- owner
  ): Promise<UserRoomSchema[]> {
    return this.userRoomService.addUserToRoom(roomId, userId, user);
  }

  @Query('getUserRoomsByUserIdAndProjectId')
  @UseGuards(GraphQLAuthGaurd)
  async getUserRoomsByUserIdAndProjectId(
    @Args('projectId') projectId: string,
    @GetUserGQL() user: UserSchema
  ): Promise<RoomSchema[]> {
    return this.userRoomService.getUserRoomsByUserIdAndProjectId(
      projectId,
      user
    );
  }
}

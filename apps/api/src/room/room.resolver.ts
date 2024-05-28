import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { MessageSchema, RoomSchema, UserSchema } from '../entities';
import { UseGuards } from '@nestjs/common';
import { GetUserGQL } from '../auth/decorators/gql-user.decorator';
import { GraphQLAuthGaurd } from '../auth/guards/gql-auth-guard';
import { RoomService } from './room.service';

@Resolver('Room')
@UseGuards(GraphQLAuthGaurd)
export class RoomResolver {
  constructor(private readonly roomService: RoomService) {}

  @Mutation('createRoom')
  async createRoom(
    @Args('projectId') projectId: string,
    @Args('name') name: string,
    @Args('members') members: [string],
    @GetUserGQL()
    user: UserSchema
  ): Promise<RoomSchema> {
    return await this.roomService.createRoom(projectId, name, user, members);
  }

  @Query('room')
  async room(@Args('id') id: string): Promise<RoomSchema> {
    const room = await this.roomService.findOne({
      where: {
        id,
      },
    });
    return room;
  }

  @ResolveField('messages')
  async messages(@Parent() room: RoomSchema): Promise<MessageSchema[]> {
    console.log(room);
    const roomFound = await this.roomService.findOne({
      where: {
        id: room.id,
      },
      relations: ['messages'],
      withDeleted: true,
    });

    return roomFound.messages;
  }
}

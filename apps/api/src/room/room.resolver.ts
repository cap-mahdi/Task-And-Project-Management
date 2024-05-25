import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ProjectSchema,
  RoomSchema,
  UserRoomSchema,
  UserSchema,
} from '../entities';
import { Repository } from 'typeorm';
import { UseGuards } from '@nestjs/common';
import { GetUserGQL } from '../auth/decorators/gql-user.decorator';
import { GraphQLAuthGaurd } from '../auth/guards/gql-auth-guard';

@Resolver()
@UseGuards(GraphQLAuthGaurd)
export class RoomResolver {
  constructor(
    @InjectRepository(RoomSchema)
    private readonly roomRepository: Repository<RoomSchema>,
    @InjectRepository(ProjectSchema)
    private readonly projectRepository: Repository<ProjectSchema>,
    @InjectRepository(UserRoomSchema)
    private readonly userRoomRepository: Repository<UserRoomSchema>
  ) {}

  @Mutation('createRoom')
  async createRoom(
    @Args('projectId') projectId: string,
    @GetUserGQL() user: UserSchema
  ): Promise<RoomSchema> {
    const project = await this.projectRepository.findOne({
      where: {
        id: projectId,
      },
    });
    if (!project) {
      throw new Error('Project not found');
    }
    console.log('i read project', project);

    const room = new RoomSchema();
    room.project = project;
    const newroom: RoomSchema = await this.roomRepository.save(room);
    await this.userRoomRepository.save({
      user,
      room: newroom,
    });

    return newroom;
  }
}

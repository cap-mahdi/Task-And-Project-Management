import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { UserWorkspaceSchema } from '../entities/userWorkspace.entity';
import { Repository } from 'typeorm';
import { WorkspaceSchema } from '../entities/workspace.entity';
import { UserSchema } from '../entities/user.entity';
import { GetUserGQL } from '../auth/decorators/gql-user.decorator';
import { UserWorkspace } from '../graphql';
import { UseGuards } from '@nestjs/common';
import { GraphQLAuthGaurd } from '../auth/guards/gql-auth-guard';

@Resolver('UserWorkspace')
@UseGuards(GraphQLAuthGaurd)
export class UserWorkspaceResolver {
  constructor(
    @InjectRepository(UserWorkspaceSchema)
    private userWorkspaceRepository: Repository<UserWorkspaceSchema>,
    @InjectRepository(WorkspaceSchema)
    private workspaceRepository: Repository<WorkspaceSchema>,
    @InjectRepository(UserSchema)
    private userRepository: Repository<UserSchema>
  ) {}


  

  @Query()
  async userWorkspaces(
    @GetUserGQL() user: UserSchema
  ): Promise<UserWorkspaceSchema[]> {
    console.info('user', user);

    return await this.userWorkspaceRepository.find({
      where: {
        user: { id: user.id },
      },
      relations: ['user'],
    });
  }

  @ResolveField('workspace')
  async workspace(
    @Parent() userWorkspace: UserWorkspaceSchema
  ): Promise<WorkspaceSchema> {
    const workspaces = await this.workspaceRepository.findOne({
      where: {
        userWorkspaces: { id: userWorkspace.id },
      },
      relations: ['userWorkspaces'],
    });
    console.info('workspaces', workspaces);
    return workspaces;
  }

  @ResolveField('user')
  async user(
    @Parent() userWorkspace: UserWorkspaceSchema
  ): Promise<UserSchema> {
    const users = await this.userRepository.findOne({
      where: {
        userWorkspaces: { id: userWorkspace.id },
      },
      relations: ['userWorkspaces'],
    });
    console.info('users', users);
    return users;
  }
}

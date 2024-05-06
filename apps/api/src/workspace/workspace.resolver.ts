import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { UserWorkspaceSchema } from '../entities/userWorkspace.entity';
import { Repository } from 'typeorm';
import { WorkspaceSchema } from '../entities/workspace.entity';
import { CreateWorkspaceInput, WorkspaceRole } from '../graphql';
import { GetUserGQL } from '../auth/decorators/gql-user.decorator';
import { UserSchema } from '../entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { GraphQLAuthGaurd } from '../auth/guards/gql-auth-guard';

@Resolver('Workspace')
export class WorkspaceResolver {
  constructor(
    @InjectRepository(UserWorkspaceSchema)
    private userWorkspaceRepository: Repository<UserWorkspaceSchema>,

    @InjectRepository(WorkspaceSchema)
    private workspaceRepository: Repository<WorkspaceSchema>
  ) { }

  @Mutation('createWorkspace')
  @UseGuards(GraphQLAuthGaurd)
  async createWorkspace(
    @Args('input') createWorkspaceInput: CreateWorkspaceInput,
    @GetUserGQL() user: UserSchema
  ): Promise<WorkspaceSchema> {
    const workspace = await this.workspaceRepository.save({
      ...createWorkspaceInput,
      creator: user,
    });

    await this.userWorkspaceRepository.save({
      role: WorkspaceRole.WORKSPACE_ADMIN,
      workspace: workspace,
      user: user,
    });

    return workspace;
  }

  @Query('workspaces')
  @UseGuards(GraphQLAuthGaurd)
  async workspaces(@GetUserGQL() user: UserSchema): Promise<WorkspaceSchema[]> {
    console.info('user', user);
    const userWorkspaces: UserWorkspaceSchema[] =
      await this.userWorkspaceRepository.find({
        where: {
          user: {
            id: user.id,
          },
        },
        relations: ['workspace'],
      });
    console.info('userWorkspaces', userWorkspaces);

    return userWorkspaces.map((userWorkspace) => userWorkspace.workspace);
  }

  @ResolveField('userWorkspaces')
  async userWorkspaces(
    @Parent() workspace: WorkspaceSchema
  ): Promise<UserWorkspaceSchema[]> {
    const ws = await this.userWorkspaceRepository.find({
      where: {
        workspace: {
          id: workspace.id,
        },
      },

      relations: ['workspace'],
    });

    return ws;
  }
}

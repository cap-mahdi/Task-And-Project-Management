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
import {
  CreateWorkspaceInput,
  UpdateWorkspaceInput,
  WorkspaceRole,
} from '../graphql';
import { GetUserGQL } from '../auth/decorators/gql-user.decorator';
import { UserSchema } from '../entities/user.entity';
import { Inject, UseGuards } from '@nestjs/common';
import { GraphQLAuthGaurd } from '../auth/guards/gql-auth-guard';
import { WorkspaceRoles } from '../auth/decorators/workspace-roles.decorator';
import { ProjectSchema } from '../entities';

@Resolver('Workspace')
@UseGuards(GraphQLAuthGaurd)
export class WorkspaceResolver {
  constructor(
    @InjectRepository(UserWorkspaceSchema)
    private userWorkspaceRepository: Repository<UserWorkspaceSchema>,

    @InjectRepository(WorkspaceSchema)
    private workspaceRepository: Repository<WorkspaceSchema>,
    @InjectRepository(ProjectSchema)
    private projectRepository: Repository<ProjectSchema>
  ) {}

  @Mutation('createWorkspace')
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

  @Mutation('updateWorkspace')
  @WorkspaceRoles(WorkspaceRole.WORKSPACE_ADMIN, WorkspaceRole.WORKSPACE_EDITOR)
  async updateWorkspace(
    @Args('id') id: string,
    @Args('input') updateWorkspaceInput: UpdateWorkspaceInput,
    @GetUserGQL() user: UserSchema
  ): Promise<WorkspaceSchema> {
    const workspace = await this.workspaceRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!workspace) {
      throw new Error('Workspace not found');
    }

    const userWorkspace = await this.userWorkspaceRepository.findOne({
      where: {
        workspace: {
          id: id,
        },
        user: {
          id: user.id,
        },
      },
    });

    if (!userWorkspace) {
      throw new Error('User not member of the workspace');
    }

    const roles = Reflect.getMetadata(
      'roles',
      this.updateWorkspace
    ) as WorkspaceRole[];
    if (!roles.includes(userWorkspace.role)) {
      throw new Error('Unauthorized access');
    }

    return this.workspaceRepository.save({
      ...workspace,
      ...updateWorkspaceInput,
    });
  }
  @Query('workspace')
  async workspace(
    @Args('id') id: string,
    @GetUserGQL() user: UserSchema
  ): Promise<WorkspaceSchema> {
    const workspace = await this.workspaceRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!workspace) {
      throw new Error('Workspace not found');
    }

    const userWorkspace = await this.userWorkspaceRepository.findOne({
      where: {
        workspace: {
          id: id,
        },
        user: {
          id: user.id,
        },
      },
    });

    if (!userWorkspace) {
      throw new Error('User not member of the workspace');
    }

    return workspace;
  }

  @Query('workspaces')
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

  @ResolveField('projects')
  async projects(
    @Parent() workspace: WorkspaceSchema
  ): Promise<ProjectSchema[]> {
    return this.projectRepository.find({
      where: {
        workspace: {
          id: workspace.id,
        },
      },
    });
  }
}

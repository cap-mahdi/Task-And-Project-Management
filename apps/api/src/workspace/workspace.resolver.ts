import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UserWorkspaceSchema } from '../entities/userWorkspace.entity';
import { WorkspaceSchema } from '../entities/workspace.entity';
import {
  CreateWorkspaceInput,
  UpdateWorkspaceInput,
  WorkspaceRole,
} from '../graphql';
import { GetUserGQL } from '../auth/decorators/gql-user.decorator';
import { UserSchema } from '../entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { GraphQLAuthGaurd } from '../auth/guards/gql-auth-guard';
import { WorkspaceRoles } from '../auth/decorators/workspace-roles.decorator';
import { UserWorkspaceService } from '../user-workspace/user-workspace.service';
import { WorkspaceService } from './workspace.service';
import { ProjectService } from '../project/project.service';
import { ProjectSchema } from '../entities';
import { UserProjectService } from '../user-project/user-project.service';

@Resolver('Workspace')
@UseGuards(GraphQLAuthGaurd)
export class WorkspaceResolver {
  constructor(
    private readonly workspaceService: WorkspaceService,
    private readonly userWorkspaceService: UserWorkspaceService,
    private readonly projectService: ProjectService,
    private readonly userProjectService: UserProjectService
  ) {}

  @Mutation('createWorkspace')
  async createWorkspace(
    @Args('input') createWorkspaceInput: CreateWorkspaceInput,
    @GetUserGQL() user: UserSchema
  ): Promise<WorkspaceSchema> {
    const workspace = await this.workspaceService.createWorkspace(
      createWorkspaceInput,
      user
    );

    return workspace;
  }

  @Mutation('updateWorkspace')
  @WorkspaceRoles(WorkspaceRole.WORKSPACE_ADMIN, WorkspaceRole.WORKSPACE_EDITOR)
  async updateWorkspace(
    @Args('id') id: string,
    @Args('input') updateWorkspaceInput: UpdateWorkspaceInput,
    @GetUserGQL() user: UserSchema
  ): Promise<WorkspaceSchema> {
    const workspace = await this.workspaceService.findWorkspaceById(id);

    const roles = Reflect.getMetadata(
      'roles',
      this.updateWorkspace
    ) as WorkspaceRole[];

    if (!(await this.userWorkspaceService.isAuthorized(user.id, id, roles))) {
      throw new Error('Unauthorized access');
    }

    const updatedWorkspace = { ...workspace, ...updateWorkspaceInput };
    return this.workspaceService.updateWorkspace(updatedWorkspace);
  }

  @Query('workspace')
  async workspace(
    @Args('id') id: string,
    @GetUserGQL() user: UserSchema
  ): Promise<WorkspaceSchema> {
    const workspace = await this.workspaceService.findWorkspaceById(id);

    await this.userWorkspaceService.findUserWorkspace(user.id, id);

    return workspace;
  }

  @Query('workspaces')
  async workspaces(@GetUserGQL() user: UserSchema): Promise<WorkspaceSchema[]> {
    console.info('user', user);
    // const userWorkspaces: UserWorkspaceSchema[] =
    //   await this.userWorkspaceRepository.find({
    //     where: {
    //       user: {
    //         id: user.id,
    //       },
    //     },
    //     relations: ['workspace'],
    //   });
    // console.info('userWorkspaces', userWorkspaces);

    const userWorkspaces =
      await this.userWorkspaceService.findUserWorkspacesByUserId(user.id);

    return userWorkspaces.map((userWorkspace) => userWorkspace.workspace);
  }

  @ResolveField('userWorkspaces')
  async userWorkspaces(
    @Parent() workspace: WorkspaceSchema
  ): Promise<UserWorkspaceSchema[]> {
    const workspaces =
      await this.userWorkspaceService.findUserWorkspacesByWorkspaceId(
        workspace.id
      );
    return workspaces;
  }
  @ResolveField('projects')
  async projects(
    @Parent() workspace: WorkspaceSchema,
    @GetUserGQL() user: UserSchema
  ): Promise<ProjectSchema[]> {
    return this.projectService.findOwnProjects(user.id, workspace.id);
  }
}

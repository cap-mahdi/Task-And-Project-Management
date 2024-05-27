import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { GraphQLAuthGaurd } from '../auth/guards/gql-auth-guard';
import { GetUserGQL } from '../auth/decorators/gql-user.decorator';
import {
  CreateProjectInput,
  Milestone,
  ProjectRole,
  WorkspaceRole,
} from '../graphql';
import { ProjectSchema } from '../entities/project.entity';
import { WorkspaceSchema } from '../entities/workspace.entity';
import { UserProjectSchema } from '../entities/userProject.entity';
import { UserSchema } from '../entities/user.entity';
import { WorkspaceRoles } from '../auth/decorators/workspace-roles.decorator';
import { UserProjectService } from '../user-project/user-project.service';
import { UserWorkspaceService } from '../user-workspace/user-workspace.service';
import { WorkspaceService } from '../workspace/workspace.service';
import { ProjectService } from './project.service';
import { MilestoneSchema } from '../entities';

@Resolver('Project')
@UseGuards(GraphQLAuthGaurd)
export class ProjectResolver {
  constructor(
    private readonly projectService: ProjectService,
    private readonly userProjectService: UserProjectService,
    private readonly workspaceService: WorkspaceService,
    private readonly userWorkspaceService: UserWorkspaceService
  ) {}

  @Mutation('createProject')
  @WorkspaceRoles(WorkspaceRole.WORKSPACE_ADMIN)
  async createProject(
    @Args('input') createProjectInput: CreateProjectInput,
    @GetUserGQL() user: UserSchema
  ): Promise<ProjectSchema> {
    // check if workspace exists
    const workspace = await this.workspaceService.findWorkspaceById(
      createProjectInput.workspaceId
    );

    // check user authorization
    const roles = Reflect.getMetadata('roles', this.createProject);
    if (
      !(await this.userWorkspaceService.isAuthorized(
        user.id,
        createProjectInput.workspaceId,
        roles
      ))
    ) {
      throw new Error('Unauthorized access');
    }

    // create project
    const createdProject = {
      ...createProjectInput,
      creator: user,
      workspace: workspace,
    };
    const project: ProjectSchema = await this.projectService.createProject(
      createdProject
    );

    await this.userProjectService.addUserToProject(
      user,
      project,
      ProjectRole.Project_ADMIN
    );

    return project;
  }

  @Query('projects')
  async projects(@GetUserGQL() user: UserSchema): Promise<ProjectSchema[]> {
    const userProjects = await this.userProjectService.findUserProjectsByUserId(
      user.id
    );
    return userProjects.map((userProject) => userProject.project);
  }

  @Query('project')
  async project(
    @GetUserGQL() user: UserSchema,
    @Args('id') projectId: string
  ): Promise<ProjectSchema> {
    const userProject =
      await this.userProjectService.findUserProjectByProjectIdAndUserId(
        user.id,
        projectId
      );
    return userProject.project;
  }

  @Query('getWorkspaceMembersNotInProject')
  async getWorkspaceMembersNotInProject(
    @Args('projectId') projectId: string,
    @GetUserGQL() user: UserSchema
  ) {
    const users =
      this.projectService.getWorkspaceMembersNotInProject(projectId);
    return users;
  }

  @ResolveField('userProjects')
  async userProjects(
    @Parent() project: ProjectSchema
  ): Promise<UserProjectSchema[]> {
    const userProjects = this.userProjectService.findUserProjectsByProjectId(
      project.id
    );
    return userProjects;
  }

  @ResolveField('workspace')
  async workspace(@Parent() project: ProjectSchema): Promise<WorkspaceSchema> {
    return this.workspaceService.findWorkspacebyProjectId(project.id);
  }
  @ResolveField('milestones')
  async milestones(
    @Parent() project: ProjectSchema
  ): Promise<MilestoneSchema[]> {
    return this.projectService
      .findOne({
        where: { id: project.id },
        relations: ['milestones'],
      })
      .then((project) => project.milestones);
  }
}

import { Inject, UseGuards } from '@nestjs/common';
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
import { CreateProjectInput, ProjectRole, User, WorkspaceRole } from '../graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectSchema } from '../entities/project.entity';
import { Repository } from 'typeorm';
import { WorkspaceSchema } from '../entities/workspace.entity';
import { UserProjectSchema } from '../entities/userProject.entity';
import { UserSchema } from '../entities/user.entity';
import { WorkspaceRoles } from '../auth/decorators/workspace-roles.decorator';
import { UserWorkspaceSchema } from '../entities';

@Resolver('Project')
@UseGuards(GraphQLAuthGaurd)
export class ProjectResolver {
  constructor(
    @InjectRepository(ProjectSchema)
    private projectRepository: Repository<ProjectSchema>,
    @InjectRepository(WorkspaceSchema)
    private workspaceRepository: Repository<WorkspaceSchema>,
    @InjectRepository(UserProjectSchema)
    private userProjectRepository: Repository<UserProjectSchema>,
    @InjectRepository(UserWorkspaceSchema)
    private userWorkspaceRepository: Repository<UserWorkspaceSchema>
  ) { }

  @Mutation('createProject')
  @WorkspaceRoles(WorkspaceRole.WORKSPACE_ADMIN)
  async createProject(
    @Args('input') createProjectInput: CreateProjectInput,
    @GetUserGQL() user: UserSchema
  ): Promise<ProjectSchema> {

    const workspace: WorkspaceSchema = await this.workspaceRepository.findOne({
      where: {
        id: createProjectInput.workspaceId,
      }, relations: ['creator'],
    });
    if (!workspace) {
      throw new Error('Workspace not found');
    }


    console.log('i read workspace', workspace)

    // check user authorization
    const userWorkspace = await this.userWorkspaceRepository.findOne({
      where: {
        user: { id: user.id },
        workspace: { id: createProjectInput.workspaceId },
      },
    });

    if (!userWorkspace) {
      throw new Error('User not member of the workspace')
    }

    const roles = Reflect.getMetadata('roles', this.createProject);
    if (!roles.includes(userWorkspace.role)) {
      throw new Error('Unauthorized access');
    }


    const project: ProjectSchema = await this.projectRepository.save({
      ...createProjectInput,
      creator: user,
      workspace: workspace,
    });

    console.log('project:', project)

    await this.userProjectRepository.save({
      role: ProjectRole.Project_ADMIN,
      project: project,
      user: user,
    });

    return project;
  }


  @Query('projects')
  async projects(@GetUserGQL() user: UserSchema): Promise<ProjectSchema[]> {
    const userProjects: UserProjectSchema[] =
      await this.userProjectRepository.find({
        where: {
          user: {
            id: user.id,
          },
        },
        relations: ['project'],
      });
    return userProjects.map((userProject) => userProject.project);
  }

  @ResolveField('userProjects')
  async userProjects(
    @Parent() project: ProjectSchema
  ): Promise<UserProjectSchema[]> {
    const userProjects: UserProjectSchema[] =
      await this.userProjectRepository.find({
        where: {
          project: {
            id: project.id,
          },
        },
        // relations: ['user'],
      });
    return userProjects;
  }

  @ResolveField('workspace')
  async workspace(@Parent() project: ProjectSchema): Promise<WorkspaceSchema> {
    return this.workspaceRepository.findOne({
      where: {
        projects: {
          id: project.id,
        },
      }, relations: ['creator']
    });
  }
}

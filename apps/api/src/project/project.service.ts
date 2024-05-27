import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectSchema } from '../entities';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { UserWorkspaceService } from '../user-workspace/user-workspace.service';
import { UserProjectService } from '../user-project/user-project.service';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectSchema)
    private readonly projectRepository: Repository<ProjectSchema>,
    private readonly userWorkspaceService: UserWorkspaceService,
    private readonly userProjectService: UserProjectService
  ) {}

  async find(options?: FindManyOptions<ProjectSchema>) {
    return this.projectRepository.find(options);
  }
  async findOne(options?: FindOneOptions<ProjectSchema>) {
    return this.projectRepository.findOne(options);
  }

  async findCreatedProjectsByUserId(userId: string): Promise<ProjectSchema[]> {
    const projects = await this.projectRepository.find({
      where: {
        creator: { id: userId },
      },
      relations: ['creator'],
    });

    console.info('projects', projects);
    return projects;
  }
  async findProjectsByWorkspaceId(
    workspaceId: string
  ): Promise<ProjectSchema[]> {
    const projects = await this.projectRepository.find({
      where: {
        workspace: {
          id: workspaceId,
        },
      },
    });
    return projects;
  }

  async findOwnProjects(userId: string, workspaceId) {
    const projects = await this.projectRepository.find({
      where: {
        workspace: {
          id: workspaceId,
        },
        userProjects: {
          user: { id: userId },
        },
      },
      relations: ['workspace'],
    });
    return projects;
  }

  async findProjectById(projectId: string): Promise<ProjectSchema> {
    const project = await this.projectRepository.findOne({
      where: {
        id: projectId,
      },
    });

    if (!project) {
      throw new Error('Project not found');
    }

    return project;
  }

  async createProject(createdProject: any): Promise<ProjectSchema> {
    return this.projectRepository.save(createdProject);
  }

  async getWorkspaceMembersNotInProject(projectId: string) {
    const workspace = await this.projectRepository
      .findOne({
        where: { id: projectId },
        relations: ['workspace'],
      })
      .then((project) => project.workspace);

    console.log('workspace from query', workspace);
    if (!workspace) {
      throw new Error('Workspace not found');
    }

    const workspaceMembers = await this.userWorkspaceService
      .find({
        where: { workspace: { id: workspace.id } },
        relations: ['user'],
      })
      .then((userWorkspaces) =>
        userWorkspaces.map((userWorkspace) => userWorkspace.user)
      );

    const projectMembers = await this.userProjectService
      .find({ where: { project: { id: projectId } }, relations: ['user'] })
      .then((userProjects) =>
        userProjects.map((userProject) => userProject.user)
      );

    return workspaceMembers.filter(
      (workspaceMember) =>
        !projectMembers.some(
          (projectMember) => projectMember.id === workspaceMember.id
        )
    );
  }
}

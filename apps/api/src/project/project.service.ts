import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectSchema } from '../entities';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectSchema)
    private readonly projectRepository: Repository<ProjectSchema>
  ) {}

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
}

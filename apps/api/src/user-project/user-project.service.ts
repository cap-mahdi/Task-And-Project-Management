import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectSchema, UserProjectSchema, UserSchema } from '../entities';
import { Repository } from 'typeorm';
import { ProjectRole } from '../graphql';

@Injectable()
export class UserProjectService {

  constructor(
    @InjectRepository(UserProjectSchema)
    private userProjectRepository: Repository<UserProjectSchema>
  ) { }

  async findUserProjectsByUserId(userId: string): Promise<UserProjectSchema[]> {
    const userProjects = await this.userProjectRepository.find({
      where: {
        user: { id: userId },
      },
      relations: ['project'],
    });
    return userProjects;
  }

  async findUserProjectsByProjectId(projectId: string): Promise<UserProjectSchema[]> {
    const userProjects = await this.userProjectRepository.find({
      where: {
        project: { id: projectId },
      },
      relations: ['user'],
    });
    return userProjects;
  }

  async findUserProjectByProjectIdAndUserId(userId: string, projectId: string): Promise<UserProjectSchema> {
    const userProject = await this.userProjectRepository.findOne({
      where: {
        user: { id: userId },
        project: { id: projectId },
      }, relations: ['user', 'project']
    });
    return userProject;
  }


  async isMemberOfProject(userId: string, projectId: string): Promise<boolean> {
    const userProject = await this.findUserProjectByProjectIdAndUserId(userId, projectId);
    return Boolean(userProject);
  }

  async isAuthorized(userId: string, projectId: string, roles: any): Promise<boolean> {
    const userProject = await this.findUserProjectByProjectIdAndUserId(userId, projectId);
    return userProject && roles.includes(userProject.role);
  }

  async addUserToProject(user: UserSchema, project: ProjectSchema, role: ProjectRole): Promise<UserProjectSchema> {
    return this.userProjectRepository.save({
      user: user,
      project: project,
      role,
    });
  }

  async softRemove(projectId: string, userId: string): Promise<UserProjectSchema> {
    const userProject = await this.findUserProjectByProjectIdAndUserId(userId, projectId);
    return this.userProjectRepository.softRemove(userProject);
  }

}

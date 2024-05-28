import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectSchema, UserProjectSchema, UserSchema } from '../entities';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { ProjectRole } from '../graphql';
import { use } from 'passport';
import EventEmitter2 from 'eventemitter2';

@Injectable()
export class UserProjectService {
  constructor(
    @InjectRepository(UserProjectSchema)
    private userProjectRepository: Repository<UserProjectSchema>,
    private readonly eventEmitter: EventEmitter2
  ) { }

  async find(options?: FindManyOptions<UserProjectSchema>) {
    return this.userProjectRepository.find(options);
  }
  async findOne(options?: FindOneOptions<UserProjectSchema>) {
    return this.userProjectRepository.findOne(options);
  }

  async findUserProjectsByUserId(userId: string): Promise<UserProjectSchema[]> {
    const userProjects = await this.userProjectRepository.find({
      where: {
        user: { id: userId },
      },
      relations: ['project'],
    });
    return userProjects;
  }

  async findUserProjectsByProjectId(
    projectId: string
  ): Promise<UserProjectSchema[]> {
    const userProjects = await this.userProjectRepository.find({
      where: {
        project: { id: projectId },
      },
      relations: ['user'],
    });
    return userProjects;
  }

  async findUserProjectByProjectIdAndUserId(
    userId: string,
    projectId: string
  ): Promise<UserProjectSchema> {
    const userProject = await this.userProjectRepository.findOne({
      where: {
        user: { id: userId },
        project: { id: projectId },
      },
      relations: ['user', 'project'],
    });

    return userProject;
  }

  async isMemberOfProject(userId: string, projectId: string): Promise<boolean> {
    const userProject = await this.findUserProjectByProjectIdAndUserId(
      userId,
      projectId
    );
    return Boolean(userProject);
  }

  async isAuthorized(
    userId: string,
    projectId: string,
    roles: any
  ): Promise<boolean> {
    const userProject = await this.findUserProjectByProjectIdAndUserId(
      userId,
      projectId
    );
    return userProject && roles.includes(userProject.role);
  }

  async addUserToProject(
    userToAdd: UserSchema,
    project: ProjectSchema,
    role: ProjectRole,
    user: UserSchema
  ): Promise<UserProjectSchema> {
    const userProject = await this.userProjectRepository.save({
      user: userToAdd,
      project: project,
      role,
    });
    console.log('userProject to be added', userProject);
    if (userToAdd.id !== user.id) {
      this.eventEmitter.emit('user.project.added', { userProject, user });
    }
    return userProject;
  }

  async softRemove(
    projectId: string,
    userId: string
  ): Promise<UserProjectSchema> {
    const userProject = await this.findUserProjectByProjectIdAndUserId(
      userId,
      projectId
    );
    return this.userProjectRepository.softRemove(userProject);
  }
}

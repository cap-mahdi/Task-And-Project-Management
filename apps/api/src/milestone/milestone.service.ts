import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  MilestoneSchema,
  ProjectSchema,
  UserProjectSchema,
  UserSchema,
} from '../entities';
import { Repository } from 'typeorm';
import { Milestone, ProjectRole, Status } from '../graphql';

@Injectable()
export class MilestoneService {
  constructor(
    @InjectRepository(MilestoneSchema)
    private milestoneRepository: Repository<MilestoneSchema>,
    @InjectRepository(ProjectSchema)
    private projectRepository: Repository<ProjectSchema>,
    @InjectRepository(UserProjectSchema)
    private userProjectRepository: Repository<UserProjectSchema>
  ) {}
  async createMilestone(
    milestone: Partial<Milestone>,
    projectId: string,
    user: UserSchema,
    allowedRoles: ProjectRole[]
  ): Promise<Milestone> {
    const project = await this.projectRepository.findOne({
      where: {
        id: projectId,
      },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }
    const userProject = await this.userProjectRepository.findOne({
      where: {
        project: { id: project.id },
        user: { id: user.id },
      },
    });

    if (!userProject || !allowedRoles.includes(userProject.role)) {
      throw new Error('User not allowed to create milestone');
    }
    const newMilestone = this.milestoneRepository.create({
      ...milestone,
      project,
      status: Status.OPEN,
    });

    return this.milestoneRepository.save(newMilestone);
  }

  async updateMilestone(
    milestoneId: string,
    milestone: Partial<Milestone>,
    user: UserSchema,
    allowedRoles: ProjectRole[]
  ): Promise<Milestone> {
    const existingMilestone = await this.milestoneRepository.findOne({
      where: {
        id: milestoneId,
      },
    });

    if (!existingMilestone) {
      throw new NotFoundException('Milestone not found');
    }

    const userProject = await this.userProjectRepository.findOne({
      where: {
        project: existingMilestone.project,
        user: { id: user.id },
      },
    });

    if (!userProject || !allowedRoles.includes(userProject.role)) {
      throw new Error('User not allowed to update milestone');
    }

    const updatedMilestone = await this.milestoneRepository.save({
      ...existingMilestone,
      ...milestone,
    });

    return updatedMilestone;
  }

  async deleteMilestone(
    milestoneId: string,
    user: UserSchema,
    allowedRoles: ProjectRole[]
  ): Promise<Milestone> {
    const existingMilestone = await this.milestoneRepository.findOne({
      where: {
        id: milestoneId,
      },
    });

    if (!existingMilestone) {
      throw new NotFoundException('Milestone not found');
    }

    const userProject = await this.userProjectRepository.findOne({
      where: {
        project: existingMilestone.project,
        user: { id: user.id },
      },
    });

    if (!userProject || !allowedRoles.includes(userProject.role)) {
      throw new Error('User not allowed to delete milestone');
    }

    await this.milestoneRepository.softDelete(existingMilestone.id);

    return existingMilestone;
  }
}

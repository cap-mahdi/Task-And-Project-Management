import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSchema, UserWorkspaceSchema, WorkspaceSchema } from '../entities';
import { Repository } from 'typeorm';
import { CreateWorkspaceInput, WorkspaceRole } from '../graphql';

@Injectable()
export class WorkspaceService {
  constructor(
    @InjectRepository(WorkspaceSchema)
    private workspaceRepository: Repository<WorkspaceSchema>,
    @InjectRepository(UserWorkspaceSchema)
    private userWorkspaceRepository: Repository<UserWorkspaceSchema>
  ) {}

  async findCreatedWorkspacesByUserId(
    userId: string
  ): Promise<WorkspaceSchema[]> {
    const workspaces = await this.workspaceRepository.find({
      where: {
        creator: { id: userId },
      },
      relations: ['creator'],
    });

    console.info('workspaces', workspaces);
    return workspaces;
  }

  async findWorkspaceById(workspaceId: string): Promise<WorkspaceSchema> {
    const workspace = await this.workspaceRepository.findOne({
      where: {
        id: workspaceId,
      },
    });

    if (!workspace) {
      throw new Error('Workspace not found');
    }
    return workspace;
  }

  async findWorkspaceByUserWorkspaceId(
    userWorkspaceId: string
  ): Promise<WorkspaceSchema> {
    const workspaces = await this.workspaceRepository.findOne({
      where: {
        userWorkspaces: { id: userWorkspaceId },
      },
      relations: ['userWorkspaces'],
    });
    console.info('workspaces', workspaces);
    return workspaces;
  }

  async findWorkspacebyProjectId(projectId: string): Promise<WorkspaceSchema> {
    const workspace = await this.workspaceRepository.findOne({
      where: {
        projects: { id: projectId },
      },
      relations: ['creator'],
    });
    console.info('workspace', workspace);
    return workspace;
  }

  async createWorkspace(
    input: CreateWorkspaceInput,
    creator: UserSchema
  ): Promise<WorkspaceSchema> {
    const workspace = await this.workspaceRepository.save({
      ...input,
      creator,
    });
    await this.userWorkspaceRepository.save({
      role: WorkspaceRole.WORKSPACE_ADMIN,
      user: creator,
      workspace: workspace,
    });
    return workspace;
  }

  async updateWorkspace(
    updatedWorkspace: WorkspaceSchema
  ): Promise<WorkspaceSchema> {
    return await this.workspaceRepository.save(updatedWorkspace);
  }
}

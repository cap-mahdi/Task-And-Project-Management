import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSchema, UserWorkspaceSchema, WorkspaceSchema } from '../entities';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { WorkspaceRole } from '../graphql';
import { WorkspaceService } from '../workspace/workspace.service';
import { UserService } from '../user/user.service';
import EventEmitter2 from 'eventemitter2';

@Injectable()
export class UserWorkspaceService {
  constructor(
    @InjectRepository(UserWorkspaceSchema)
    private userWorkspaceRepository: Repository<UserWorkspaceSchema>,

    private readonly userService: UserService,
    private readonly workspaceService: WorkspaceService,
    private readonly eventEmitter: EventEmitter2
  ) { }

  async find(options?: FindManyOptions<UserWorkspaceSchema>) {
    return this.userWorkspaceRepository.find(options);
  }
  async findOne(options?: FindOneOptions<UserWorkspaceSchema>) {
    return this.userWorkspaceRepository.findOne(options);
  }

  async findUserWorkspacesByUserId(
    userId: string
  ): Promise<UserWorkspaceSchema[]> {
    const userWorkspaces = await this.userWorkspaceRepository.find({
      where: {
        user: { id: userId },
      },
      relations: ['workspace'],
    });
    console.info('userWorkspaces', userWorkspaces);
    return userWorkspaces;
  }

  async findUserWorkspacesByWorkspaceId(
    workspaceId: string
  ): Promise<UserWorkspaceSchema[]> {
    const userWorkspaces = await this.userWorkspaceRepository.find({
      where: {
        workspace: { id: workspaceId },
      },
      relations: ['workspace', 'user'],
    });
    console.info('userWorkspaces', userWorkspaces);
    return userWorkspaces;
  }

  async isAuthorized(
    userId: string,
    workspaceId: string,
    roles: string[]
  ): Promise<boolean> {
    const userWorkspace = await this.findUserWorkspace(userId, workspaceId);
    if (!userWorkspace) {
      throw new Error('User not in workspace');
    }
    if (!roles.includes(userWorkspace.role))
      throw new Error('Unauthorized access');
    return true;
  }

  async findUserWorkspace(
    memberId: string,
    workspaceId: string
  ): Promise<UserWorkspaceSchema> {
    const userWorkspace = await this.userWorkspaceRepository.findOne({
      where: {
        user: { id: memberId },
        workspace: { id: workspaceId },
      },
      relations: ['user', 'workspace'],
    });

    return userWorkspace;
  }
  async updateUserWorkspace(
    memberId: string,
    workspaceId: string,
    role: WorkspaceRole
  ): Promise<UserWorkspaceSchema> {
    const editedUserWorkspace = await this.findUserWorkspace(
      memberId,
      workspaceId
    );
    if (!editedUserWorkspace) {
      throw new Error('User to be edited is not member of the workspace');
    }

    // make changes
    editedUserWorkspace.role = role;

    // retrurn the updated user workspace
    return this.userWorkspaceRepository.save(editedUserWorkspace);
  }

  async addUserToWorkspace(
    userToAdd: UserSchema,
    workspace: WorkspaceSchema,
    role: WorkspaceRole,
    user: UserSchema
  ): Promise<UserWorkspaceSchema> {
    const userWorkspace = await this.findUserWorkspace(
      userToAdd.id,
      workspace.id
    );

    if (userWorkspace) {
      throw new Error('User already in workspace');
    }

    const createdUserWorkspace = await this.userWorkspaceRepository.save({
      role: role,
      user: userToAdd,
      workspace: workspace,
    });

    console.log('User to add:', userToAdd);
    console.log('Current user:', user);

    if (userToAdd.id !== user.id) {
      console.log('Emitting event with new payload: ', createdUserWorkspace, user);
      this.eventEmitter.emit('user.workspace.added', { userWorkspace: createdUserWorkspace, user });
    }

    return createdUserWorkspace;
  }
}

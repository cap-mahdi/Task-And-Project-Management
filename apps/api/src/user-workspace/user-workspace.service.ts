import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserWorkspaceSchema } from "../entities";
import { Repository } from "typeorm";
import { WorkspaceRole } from "../graphql";
import { WorkspaceService } from "../workspace/workspace.service";
import { UserService } from "../user/user.service";

@Injectable()
export class UserWorkspaceService {
  constructor(
    @InjectRepository(UserWorkspaceSchema)
    private userWorkspaceRepository: Repository<UserWorkspaceSchema>,

    private readonly userService: UserService,
    private readonly workspaceService: WorkspaceService,
  ) { }

  async findUserWorkspacesByUserId(userId: string): Promise<UserWorkspaceSchema[]> {
    const userWorkspaces = await this.userWorkspaceRepository.find({
      where: {
        user: { id: userId },
      },
      relations: ['user'],
    });
    console.info('userWorkspaces', userWorkspaces);
    return userWorkspaces;
  }

  async findUserWorkspacesByWorkspaceId(workspaceId: string): Promise<UserWorkspaceSchema[]> {
    const userWorkspaces = await this.userWorkspaceRepository.find({
      where: {
        workspace: { id: workspaceId },
      },
      relations: ['workspace'],
    });
    console.info('userWorkspaces', userWorkspaces);
    return userWorkspaces;
  }

  async isAuthorized(userId: string, workspaceId: string, roles: string[]): Promise<boolean> {
    const userWorkspace = await this.userWorkspaceRepository.findOne({
      where: {
        user: { id: userId },
        workspace: { id: workspaceId },
      },
    });

    if (!userWorkspace) {
      throw new Error('User not in workspace')
    }

    return roles.includes(userWorkspace.role);
  }


  async findUserWorkspace(memberId: string, workspaceId: string): Promise<UserWorkspaceSchema> {
    const userWorkspace = await this.userWorkspaceRepository.findOne({
      where: {
        user: { id: memberId },
        workspace: { id: workspaceId },
      }, relations: ['user', 'workspace']
    });
    return userWorkspace;
  }
  async updateUserWorkspace(memberId: string, workspaceId: string, role: WorkspaceRole): Promise<UserWorkspaceSchema> {

    const editedUserWorkspace = await this.findUserWorkspace(memberId, workspaceId);
    if (!editedUserWorkspace) {
      throw new Error('User to be edited is not member of the workspace')
    }

    // make changes
    editedUserWorkspace.role = role;

    // retrurn the updated user workspace
    return this.userWorkspaceRepository.save(editedUserWorkspace);
  }

  async addUserToWorkspace(memberId: string, workspaceId: string, role: WorkspaceRole): Promise<UserWorkspaceSchema> {
    const userWorkspace = await this.findUserWorkspace(memberId, workspaceId);

    if (userWorkspace) {
      throw new Error('User already in workspace')
    }

    const user = await this.userService.getUserById(memberId);
    const workspace = await this.workspaceService.findWorkspaceById(workspaceId);

    return this.userWorkspaceRepository.save({
      role: role,
      user: user,
      workspace: workspace,
    });
  }

}

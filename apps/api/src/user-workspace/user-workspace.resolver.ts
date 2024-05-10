import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { UserWorkspaceSchema } from '../entities/userWorkspace.entity';
import { Repository } from 'typeorm';
import { WorkspaceSchema } from '../entities/workspace.entity';
import { UserSchema } from '../entities/user.entity';
import { GetUserGQL } from '../auth/decorators/gql-user.decorator';
import { EmailRoleInput, UpdateUserWorkspace, UserWorkspace, WorkspaceRole } from '../graphql';
import { UseGuards } from '@nestjs/common';
import { GraphQLAuthGaurd } from '../auth/guards/gql-auth-guard';
import { WorkspaceRoles } from '../auth/decorators/workspace-roles.decorator';

@Resolver('UserWorkspace')
@UseGuards(GraphQLAuthGaurd)
export class UserWorkspaceResolver {
  constructor(
    @InjectRepository(UserWorkspaceSchema)
    private userWorkspaceRepository: Repository<UserWorkspaceSchema>,
    @InjectRepository(WorkspaceSchema)
    private workspaceRepository: Repository<WorkspaceSchema>,
    @InjectRepository(UserSchema)
    private userRepository: Repository<UserSchema>
  ) { }


  @Mutation('updateUserWorkspace')
  @WorkspaceRoles(WorkspaceRole.WORKSPACE_ADMIN, WorkspaceRole.WORKSPACE_EDITOR)
  async updateUserWorkspace(
    @Args('userId') memberId: string,
    @Args('workspaceId') workspaceId: string,
    @Args('input') {role}: UpdateUserWorkspace,
    @GetUserGQL() user: UserSchema
  ): Promise<UserWorkspaceSchema> {
    // check if worskpace exists

    const workspace = await this.workspaceRepository.findOne({
      where: {
        id: workspaceId,
      },
    });

    if (!workspace) {
      throw new Error('Workspace not found')
    }
    // check authorization
    const editorWorkspace = await this.userWorkspaceRepository.findOne({
      where: {
        user: { id: user.id },
        workspace: { id: workspaceId },
      },
    });

    if (!editorWorkspace) {
      throw new Error('Editor user not member of the workspace')
    }

    const roles = Reflect.getMetadata('roles', this.updateUserWorkspace);
    if (!roles.includes(editorWorkspace.role)) {
      throw new Error('Unauthorizd access')
    }

    // check if user exists

    const editedUser = await this.userRepository.findOne({
      where: {
        id: memberId,
      },
    });

    if (!editedUser) {
      throw new Error('User not found')
    }



    // check if user is within the workspace
    const editedUserWorkspace = await this.userWorkspaceRepository.findOne({
      where: {
        user: { id: memberId },
        workspace: { id: workspaceId },
      }, relations: ['user', 'workspace']
    });

    if (!editedUserWorkspace) {
      throw new Error('User to be edited is not member of the workspace')
    }

    // make changes
    editedUserWorkspace.role = role;

    // retrurn the updated user workspace
    return this.userWorkspaceRepository.save(editedUserWorkspace);
  }

  @Mutation('addUsersToWorkspace')
  @WorkspaceRoles(WorkspaceRole.WORKSPACE_ADMIN, WorkspaceRole.WORKSPACE_EDITOR)
  async addUsersToWorkspace(
    @Args('workspaceId') workspaceId: string,
    @Args('emailRoles') emailRoles: EmailRoleInput[],
    @GetUserGQL() user: UserSchema
  ): Promise<UserWorkspaceSchema[]> {
    // check if worskpace exists

    const workspaceToFind = await this.workspaceRepository.findOne({
      where: {
        id: workspaceId,
      },
    });

    if (!workspaceToFind) {
      throw new Error('Workspace not found')
    }

    // check authorization
    const editorWorkspace = await this.userWorkspaceRepository.findOne({
      where: {
        user: { id: user.id },
        workspace: { id: workspaceId },
      },
    });

    if (!editorWorkspace) {
      throw new Error('Editor user not member of the workspace')
    }

    const roles = Reflect.getMetadata('roles', this.addUsersToWorkspace);
    if (!roles.includes(editorWorkspace.role)) {
      throw new Error('Unauthorizd access')
    }

    // check if workspace exists
    const workspace = await this.workspaceRepository.findOne({
      where: {
        id: workspaceId,
      },
    });

    if (!workspace) {
      throw new Error('Workspace not found')
    }

    // check if users exist and are not already in the workspace
    // make the changes 
    return await Promise.all(
      emailRoles.map(async ({ email, role }) => {
        const userToAdd = await this.userRepository.findOne({
          where: {
            email: email,
          },
        });

        if (!userToAdd) {
          throw new Error('User not found')
        }

        const userToAddWorkspace = await this.userWorkspaceRepository.findOne({
          where: {
            user: { id: userToAdd.id },
            workspace: { id: workspaceId },
          },
        });

        if (userToAddWorkspace) {
          throw new Error('User already in the workspace')
        }

        return this.userWorkspaceRepository.save({
          role: role,
          user: userToAdd,
          workspace: workspace,
        });

      }))
  }


  @Query()
  async userWorkspaces(
    @GetUserGQL() user: UserSchema
  ): Promise<UserWorkspaceSchema[]> {
    console.info('user', user);

    return await this.userWorkspaceRepository.find({
      where: {
        user: { id: user.id },
      },
      relations: ['user'],
    });
  }

  @ResolveField('workspace')
  async workspace(
    @Parent() userWorkspace: UserWorkspaceSchema
  ): Promise<WorkspaceSchema> {
    const workspaces = await this.workspaceRepository.findOne({
      where: {
        userWorkspaces: { id: userWorkspace.id },
      },
      relations: ['userWorkspaces'],
    });
    console.info('workspaces', workspaces);
    return workspaces;
  }

  @ResolveField('user')
  async user(
    @Parent() userWorkspace: UserWorkspaceSchema
  ): Promise<UserSchema> {
    const users = await this.userRepository.findOne({
      where: {
        userWorkspaces: { id: userWorkspace.id },
      },
      relations: ['userWorkspaces'],
    });
    console.info('users', users);
    return users;
  }
}

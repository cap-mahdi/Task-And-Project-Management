import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UserWorkspaceSchema } from '../entities/userWorkspace.entity';
import { WorkspaceSchema } from '../entities/workspace.entity';
import { UserSchema } from '../entities/user.entity';
import { GetUserGQL } from '../auth/decorators/gql-user.decorator';
import {
  AddUserWorkspaceInput,
  EmailRoleInput,
  UpdateUserWorkspace,
  WorkspaceRole,
} from '../graphql';
import { UseGuards } from '@nestjs/common';
import { GraphQLAuthGaurd } from '../auth/guards/gql-auth-guard';
import { WorkspaceRoles } from '../auth/decorators/workspace-roles.decorator';
import { UserService } from '../user/user.service';
import { WorkspaceService } from '../workspace/workspace.service';
import { UserWorkspaceService } from './user-workspace.service';
import mapStringToEnum from '../utils/mapStringToEnum';

@Resolver('UserWorkspace')
@UseGuards(GraphQLAuthGaurd)
export class UserWorkspaceResolver {
  constructor(
    private readonly userWorkspaceService: UserWorkspaceService,
    private readonly workspaceService: WorkspaceService,
    private readonly userService: UserService
  ) {}

  @Query('getWorkspaceUsers')
  async getWorkspaceUsers(
    @Args('workspaceId') workspaceId: string,
    @GetUserGQL() user: UserSchema
  ): Promise<UserWorkspaceSchema[]> {
    const userWorkspaces =
      await this.userWorkspaceService.findUserWorkspacesByWorkspaceId(
        workspaceId
      );
    if (
      !userWorkspaces.find((userWorkspace) => {
        if (userWorkspace.user.id === user.id) {
          return userWorkspace;
        }
      })
    ) {
      throw new Error('Unauthorized access');
    }
    return userWorkspaces;
  }
  @Mutation('updateUserWorkspace')
  @WorkspaceRoles(WorkspaceRole.WORKSPACE_ADMIN, WorkspaceRole.WORKSPACE_EDITOR)
  async updateUserWorkspace(
    @Args('userId') memberId: string,
    @Args('workspaceId') workspaceId: string,
    @Args('input') { role }: UpdateUserWorkspace,
    @GetUserGQL() user: UserSchema
  ): Promise<UserWorkspaceSchema> {
    // check if worskpace exists
    await this.workspaceService.findWorkspaceById(workspaceId);

    // check authorization
    const roles = Reflect.getMetadata('roles', this.updateUserWorkspace);
    if (
      !(await this.userWorkspaceService.isAuthorized(
        user.id,
        workspaceId,
        roles
      ))
    ) {
      throw new Error('Unauthorized access');
    }

    // check if user exists
    await this.userService.getUserById(memberId);

    // check if user is within the workspace and save the changes
    return this.userWorkspaceService.updateUserWorkspace(
      memberId,
      workspaceId,
      role
    );
  }

  @Mutation('addUsersToWorkspace')
  @WorkspaceRoles(WorkspaceRole.WORKSPACE_ADMIN, WorkspaceRole.WORKSPACE_EDITOR)
  async addUsersToWorkspace(
    @Args('input') input: AddUserWorkspaceInput,
    @GetUserGQL() user: UserSchema
  ): Promise<UserWorkspaceSchema[]> {
    const { workspaceId, emailRoles } = input;
    const workspace = await this.workspaceService.findWorkspaceById(
      workspaceId
    );

    // check authorization
    const roles = Reflect.getMetadata('roles', this.addUsersToWorkspace);
    await this.userWorkspaceService.isAuthorized(user.id, workspaceId, roles);

    // check if users exist and are not already in the workspace
    // make the changes
    return await Promise.all(
      emailRoles.map(async ({ email, role: roleString }) => {
        const role = mapStringToEnum(roleString, WorkspaceRole);

        const userToAdd = await this.userService.getUserByEmail(email);
        console.log('user to add now: ', userToAdd);
        return this.userWorkspaceService.addUserToWorkspace(
          userToAdd,
          workspace,
          role
        );
      })
    );
  }

  @Query()
  async userWorkspaces(
    @GetUserGQL() user: UserSchema
  ): Promise<UserWorkspaceSchema[]> {
    console.info('user', user);
    return await this.userWorkspaceService.findUserWorkspacesByUserId(user.id);
  }

  @ResolveField('workspace')
  async workspace(
    @Parent() userWorkspace: UserWorkspaceSchema
  ): Promise<WorkspaceSchema> {
    return this.workspaceService.findWorkspaceByUserWorkspaceId(
      userWorkspace.id
    );
  }

  @ResolveField('user')
  async user(
    @Parent() userWorkspace: UserWorkspaceSchema
  ): Promise<UserSchema> {
    return this.userService.getUserByUserWorkspaceId(userWorkspace.id);
  }
}

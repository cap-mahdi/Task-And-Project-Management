import {
  Resolver,
  Query,
  Args,
  ResolveField,
  Parent,
  Mutation,
} from '@nestjs/graphql';
import { UserSchema } from '../entities/user.entity';
import { UserWorkspaceSchema } from '../entities/userWorkspace.entity';
import { ChangePasswordInput, GetUserInput, UpdateUserInput } from '../graphql';
import { GraphQLAuthGaurd } from '../auth/guards/gql-auth-guard';
import { ForbiddenException, UseGuards } from '@nestjs/common';
import { GetUserGQL } from '../auth/decorators/gql-user.decorator';
import { UserService } from './user.service';
import { UserWorkspaceService } from '../user-workspace/user-workspace.service';
import { ProjectSchema, UserProjectSchema, WorkspaceSchema } from '../entities';
import { UserProjectService } from '../user-project/user-project.service';
import { WorkspaceService } from '../workspace/workspace.service';
import { ProjectService } from '../project/project.service';

@Resolver('User')
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly userWorkspaceService: UserWorkspaceService,
    private readonly userProjectService: UserProjectService,
    private readonly workspaceService: WorkspaceService,
    private readonly projectService: ProjectService
  ) {}

  @Query()
  async users() {
    const users = await this.userService.findAll();
    console.info('users', users);
    return users;
  }

  @Query()
  async getUsersByParams(
    @Args('input') input: GetUserInput
  ): Promise<UserSchema[]> {
    return this.userService.findAllByParams(input);
  }

  @Query()
  @UseGuards(GraphQLAuthGaurd)
  async getConnectedUser(@GetUserGQL() user: UserSchema): Promise<UserSchema> {
    return this.userService.getUserById(user.id);
  }

  @Mutation()
  @UseGuards(GraphQLAuthGaurd)
  async updateUser(
    @Args('input') input: UpdateUserInput,
    @GetUserGQL() user: UserSchema
  ): Promise<UserSchema> {
    return this.userService.updateUser(user.id, input);
  }

  @Mutation()
  @UseGuards(GraphQLAuthGaurd)
  async deleteUser(@GetUserGQL() user: UserSchema): Promise<UserSchema> {
    return this.userService.deleteUser(user.id);
  }

  @Mutation()
  @UseGuards(GraphQLAuthGaurd)
  async changePassword(
    @Args() input: ChangePasswordInput,
    @GetUserGQL() user: UserSchema
  ) {
    return this.userService.changePassword(user.id, input);
  }

  @ResolveField('userWorkspaces')
  async workspaces(@Parent() user: UserSchema): Promise<UserWorkspaceSchema[]> {
    console.info('user', user);
    return this.userWorkspaceService.findUserWorkspacesByUserId(user.id);
  }

  @ResolveField('userProjects')
  async projects(@Parent() user: UserSchema): Promise<UserProjectSchema[]> {
    return this.userProjectService.findUserProjectsByUserId(user.id);
  }

  @ResolveField('createdWorkspaces')
  async createdWorkspaces(
    @Parent() user: UserSchema
  ): Promise<WorkspaceSchema[]> {
    return this.workspaceService.findCreatedWorkspacesByUserId(user.id);
  }

  @ResolveField('createdProjects')
  async createdProjects(@Parent() user: UserSchema): Promise<ProjectSchema[]> {
    return this.projectService.findCreatedProjectsByUserId(user.id);
  }
}

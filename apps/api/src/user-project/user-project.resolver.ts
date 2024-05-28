import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { GraphQLAuthGaurd } from '../auth/guards/gql-auth-guard';
import { AddUserProjectInput, ProjectRole } from '../graphql';
import { ProjectRoles } from '../auth/decorators/project-roles.decorator';
import { GetUserGQL } from '../auth/decorators/gql-user.decorator';
import { UserSchema } from '../entities/user.entity';
import { UserProjectSchema } from '../entities/userProject.entity';
import { UserProjectService } from './user-project.service';
import { ProjectService } from '../project/project.service';
import { UserService } from '../user/user.service';
import mapStringToEnum from '../utils/mapStringToEnum';

@Resolver()
@UseGuards(GraphQLAuthGaurd)
export class UserProjectResolver {
  constructor(
    private readonly userProjectService: UserProjectService,
    private readonly projectService: ProjectService,
    private readonly userService: UserService
  ) { }

  @Query('getProjectUsers')
  async getProjectUsers(
    @Args('projectId') projectId: string,
    @GetUserGQL() user: UserSchema
  ): Promise<UserProjectSchema[]> {
    // test if project exists
    await this.projectService.findProjectById(projectId);

    // test if user is able to do change

    const userProjects =
      await this.userProjectService.findUserProjectsByProjectId(projectId);

    if (
      !userProjects.find((userProject) => {
        if (userProject.user.id === user.id) {
          return userProject;
        }
      })
    ) {
      throw new Error('Unauthorized access');
    }
    return userProjects;
  }

  @Mutation('addUsersToProject')
  @ProjectRoles(ProjectRole.Project_ADMIN, ProjectRole.Project_EDITOR)
  async addUsersToProject(
    @Args('input') input: AddUserProjectInput,

    @GetUserGQL() user: UserSchema
  ): Promise<Partial<UserProjectSchema>[]> {
    // test if project exists
    const { projectId, emailRoles } = input;

    const project = await this.projectService.findProjectById(projectId);
    // console.log('project from', project)
    // test if users exist

    const users = await Promise.all(
      emailRoles.map(async ({ email, role: roleString }) => {
        // console.log('looking for user with id: ', userId);
        const user = await this.userService.getUserByEmail(email);
        // console.log('user hhh', user);
        if (
          await this.userProjectService.isMemberOfProject(user.id, projectId)
        ) {
          // console.log('entrere tttttt')
          throw new Error('User already member of the project');
        }

        return user;
      })
    );

    // test if user is able to do change
    // test if user is able to do change

    const roles = Reflect.getMetadata('roles', this.addUsersToProject);
    if (
      !(await this.userProjectService.isAuthorized(user.id, projectId, roles))
    ) {
      throw new Error('Unauthorized access');
    }

    // do change, the users will be members by default
    // do change, the users will be members by default

    const userProjects = await Promise.all(
      emailRoles.map(async ({ email, role: roleString }) => {
        const role = mapStringToEnum(roleString, ProjectRole);

        const userToAdd = await this.userService.getUserByEmail(email);

        const userProject = await this.userProjectService.addUserToProject(
          userToAdd,
          project,
          role,
          user
        );
        return userProject;
      })
    );

    return userProjects;
  }

  @Mutation('deleteUsersFromProject')
  @ProjectRoles(ProjectRole.Project_ADMIN, ProjectRole.Project_EDITOR)
  async deleteUsersFromProject(
    @Args('projectId') projectId: string,
    @Args('userIds') userIds: string[],
    @GetUserGQL() user: UserSchema
  ): Promise<UserProjectSchema[]> {
    // test if project exists
    await this.projectService.findProjectById(projectId);

    // check privileges
    const roles = Reflect.getMetadata('roles', this.deleteUsersFromProject);
    if (
      !(await this.userProjectService.isAuthorized(user.id, projectId, roles))
    ) {
      throw new Error('Unauthorized access');
    }
    // check privileges

    const deleteUserProjects = await Promise.all(
      userIds.map(async (userId) => {
        // test if user exists
        await this.userService.getUserById(userId);
        const deleteUserProjects = await Promise.all(
          userIds.map(async (userId) => {
            // test if user exists
            await this.userService.getUserById(userId);

            // remove user if exists
            if (
              !(await this.userProjectService.isMemberOfProject(
                userId,
                projectId
              ))
            ) {
              throw new Error('User not member of the project');
            }
            // remove user if exists
            if (
              !(await this.userProjectService.isMemberOfProject(
                userId,
                projectId
              ))
            ) {
              throw new Error('User not member of the project');
            }

            return await this.userProjectService.softRemove(projectId, userId);
          })
        );
        return await this.userProjectService.softRemove(projectId, userId);
      })
    );

    return deleteUserProjects;
  }
}

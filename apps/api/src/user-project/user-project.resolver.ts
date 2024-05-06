import { Get, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GraphQLAuthGaurd } from '../auth/guards/gql-auth-guard';
import { ProjectRole } from '../graphql';
import { ProjectRoles } from '../auth/decorators/project-roles.decorator';
import { GetUserGQL } from '../auth/decorators/gql-user.decorator';
import { ProjectSchema } from '../entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSchema } from '../entities/user.entity';
import { UserProjectSchema } from '../entities/userProject.entity';

@Resolver()
export class UserProjectResolver {

    constructor(
        @InjectRepository(ProjectSchema)
        private projectRepository: Repository<ProjectSchema>,
        @InjectRepository(UserProjectSchema)
        private userProjectRepository: Repository<UserProjectSchema>
    ) { }


    @Mutation('addUsersToProject')
    @ProjectRoles(ProjectRole.Project_ADMIN, ProjectRole.Project_EDITOR)
    @UseGuards(GraphQLAuthGaurd)
    async addUsersToProject(
        @Args('projectId') projectId: string,
        @Args('userIds') userIds: string[],
        @GetUserGQL() user: UserSchema
    ): Promise<UserProjectSchema[]> {

        // test if project exists

        const project = await this.projectRepository.findOne({
            where: {
                id: projectId
            }
        });

        if (!project) {
            throw new Error('Project not found');
        }

        // test if users exist

        const users = await Promise.all(
            userIds.map(async (userId) => {
                const user = await this.projectRepository.findOne({
                    where: {
                        id: userId
                    }
                });

                if (!user) {
                    throw new Error('User with ID ' + userId + ' not found');
                }

                return user;
            }
            )
        );

        // test if user is able to do change

        const userProject = await this.userProjectRepository.findOne({
            where: {
                project: {
                    id: projectId
                },
                user: {
                    id: user.id
                }
            }
        });

        if (!userProject) {
            throw new Error('User not member of the project');
        }

        const roles = Reflect.getMetadata('roles', this.addUsersToProject);
        if (!roles.includes(userProject.role)) {
            throw new Error('Unauthorized access');
        }

        // do change, the users will be members by default

        const userProjects = await Promise.all(
            users.map(async (user) => {
                const userProject = await this.userProjectRepository.save({
                    role: ProjectRole.Project_MEMBER,
                    project: project,
                    user: user
                });

                return userProject;
            })
        )

        return userProjects;
    }

    @Mutation('deleteUsersFromProject')
    @ProjectRoles(ProjectRole.Project_ADMIN, ProjectRole.Project_EDITOR)
    @UseGuards(GraphQLAuthGaurd)
    async deleteUsersFromProject(
        @Args('projectId') projectId: string,
        @Args('userIds') userIds: string[],
        @GetUserGQL() user: UserSchema
    ): Promise<UserProjectSchema[]> {
        const project = await this.projectRepository.findOne({
            where: {
                id: projectId
            }
        });


        if (!project) {
            throw new Error('Project not found');
        }

        const deleteUserProjects = await Promise.all(
            userIds.map(async (userId) => {
                const user = await this.projectRepository.findOne({
                    where: {
                        id: userId
                    }
                });

                if (!user) {
                    throw new Error('User with ID ' + userId + ' not found');
                }

                const userProject = await this.userProjectRepository.findOne({
                    where: {
                        project: {
                            id: projectId
                        },
                        user: {
                            id: userId
                        }
                    }
                });

                if (!userProject) {
                    throw new Error('User not member of the project');
                }

                return userProject;
            }
            )
        );

        const userProject = await this.userProjectRepository.findOne({
            where: {
                project: {
                    id: projectId
                },
                user: {
                    id: user.id
                }
            }
        });

        if (!userProject) {
            throw new Error('User not member of the project');
        }

        const roles = Reflect.getMetadata('roles', this.deleteUsersFromProject);
        if (!roles.includes(userProject.role)) {
            throw new Error('Unauthorized access');
        }

        await Promise.all(
            deleteUserProjects.map(async (userProject) => {
                await this.userProjectRepository.delete(userProject);
            })
        );

        return deleteUserProjects;
    }
}

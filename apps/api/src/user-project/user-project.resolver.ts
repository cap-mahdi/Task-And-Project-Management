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
@UseGuards(GraphQLAuthGaurd)
export class UserProjectResolver {

    constructor(
        @InjectRepository(ProjectSchema)
        private projectRepository: Repository<ProjectSchema>,
        @InjectRepository(UserProjectSchema)
        private userProjectRepository: Repository<UserProjectSchema>,
        @InjectRepository(UserSchema)
        private userRepository: Repository<UserSchema>
    ) { }


    @Mutation('addUsersToProject')
    @ProjectRoles(ProjectRole.Project_ADMIN, ProjectRole.Project_EDITOR)
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
                const user = await this.userRepository.findOne({
                    where: {
                        id: userId
                    }
                });

                if (!user) {
                    throw new Error('User with ID ' + userId + ' not found');
                }

                const project = await this.userProjectRepository.findOne({
                    where: {
                        project: {
                            id: projectId
                        },
                        user: {
                            id: userId
                        }
                    }
                });

                if (project) {
                    throw new Error('User already member of the project');
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



        const deleteUserProjects = await Promise.all(
            userIds.map(async (userId) => {
                const user = await this.userRepository.findOne({
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
                    },
                    relations: ['user', 'project']
                });

                if (!userProject) {
                    throw new Error('User not member of the project');
                }

                await this.userProjectRepository.softRemove(userProject);

                return userProject;
            }
            )
        );


        return deleteUserProjects;

    }
}

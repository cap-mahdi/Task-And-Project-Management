import {
    Args,
    Mutation,
    Parent,
    Query,
    ResolveField,
    Resolver,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GetUserGQL } from '../auth/decorators/gql-user.decorator';
import { GraphQLAuthGaurd } from '../auth/guards/gql-auth-guard';
import { ProjectNotificationService } from './ProjectNotification.service';
import { UserSchema } from '../entities';
import { ProjectNotificationSchema } from '../entities/ProjectNotification.entity';

@Resolver('ProjectNotification')
@UseGuards(GraphQLAuthGaurd)
export class ProjectNotificationResolver {
    constructor(private readonly projectNotificationService: ProjectNotificationService) { }

    @Mutation('markProjectNotificationAsRead')
    async markProjectNotificationAsRead(@Args('id') id: string) {
        return this.projectNotificationService.markProjectNotificationAsRead(id);
    }

    @Query('projectNotifications')
    async projectNotifications(@GetUserGQL() user: UserSchema) {
        return this.projectNotificationService.find({ where: { recipient: { id: user.id } } });
    }

    @ResolveField('actor')
    async actor(@Parent() projectNotification: ProjectNotificationSchema) {
        return this.projectNotificationService
            .findOne({ where: { id: projectNotification.id }, relations: ['actor'] })
            .then((projectNotification) => {
                return projectNotification.actor;
            });
    }

    @ResolveField('project')
    async project(@Parent() projectNotification: ProjectNotificationSchema) {
        return this.projectNotificationService
            .findOne({ where: { id: projectNotification.id }, relations: ['project'] })
            .then((projectNotification) => {
                return projectNotification.project;
            });
    }
}

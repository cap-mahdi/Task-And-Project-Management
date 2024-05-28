import {
    Args,
    Mutation,
    Parent,
    Query,
    ResolveField,
    Resolver,
} from '@nestjs/graphql';
import { WorkspaceNotificationService } from "./workspaceNotification.service";
import { GetUserGQL } from "../auth/decorators/gql-user.decorator";
import { UserSchema } from '../entities';
import { WorkspaceNotificationSchema } from '../entities/WorkspaceNotification.entity';
import { GraphQLAuthGaurd } from '../auth/guards/gql-auth-guard';
import { UseGuards } from '@nestjs/common';

@Resolver('WorkspaceNotification')
@UseGuards(GraphQLAuthGaurd) 
export class WorkspaceNotificationResolver {
    constructor(
        private readonly workspaceNotificationService: WorkspaceNotificationService
    ) { }

    @Mutation('markWorkspaceNotificationAsRead')
    async markWorkspaceNotificationAsRead(@Args('id') id: string) {
        return this.workspaceNotificationService.markWorkspaceNotificationAsRead(id);
    }

    @Query('workspaceNotifications')
    async workspaceNotifications(@GetUserGQL() user: UserSchema) {
        return this.workspaceNotificationService.find({ where: { recipient: { id: user.id } } });
    }

    @ResolveField('actor')
    async actor(@Parent() workspaceNotification: WorkspaceNotificationSchema) {
        return this.workspaceNotificationService
            .findOne({ where: { id: workspaceNotification.id }, relations: ['actor'] })
            .then((workspaceNotification) => {
                return workspaceNotification.actor;
            });
    }


    @ResolveField('workspace')
    async workspace(@Parent() workspaceNotification: WorkspaceNotificationSchema) {
        return this.workspaceNotificationService
            .findOne({ where: { id: workspaceNotification.id }, relations: ['workspace'] })
            .then((workspaceNotification) => {
                return workspaceNotification.workspace;
            });
    }
}
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

@Resolver('ProjectNotification')
@UseGuards(GraphQLAuthGaurd)
export class ProjectNotificationResolver {
    constructor(private readonly projectNotificationService: ProjectNotificationService) { }


}


import { UseGuards } from "@nestjs/common";
import { Resolver, Query, Args, ResolveField, Parent } from "@nestjs/graphql";
import { GraphQLAuthGaurd } from '../auth/guards/gql-auth-guard';
import { GetUserGQL } from "../auth/decorators/gql-user.decorator";
import { CommentSchema, UserSchema } from "../entities";
import { CommentService } from "./comment.service";
@Resolver('Comment')
@UseGuards(GraphQLAuthGaurd)
export class CommentResolver {
    constructor(
        private readonly commentService: CommentService,
        private readonly taskService: TaskService
    ) { }
    @Query('comments')
    async comments(
        @Args('taskId') taskId: string,
        @GetUserGQL() user: UserSchema
    ): Promise<CommentSchema[]> {
        return this.commentService.findCommentsByTaskId(taskId);
    }

    @ResolveField('task')
    async task(@Parent() comment: CommentSchema) {
        return comment.task;
    }
}


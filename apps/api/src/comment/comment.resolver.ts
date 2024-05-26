
import { UseGuards } from "@nestjs/common";
import { Resolver, Query, Args, ResolveField, Parent, Mutation } from "@nestjs/graphql";
import { GraphQLAuthGaurd } from '../auth/guards/gql-auth-guard';
import { GetUserGQL } from "../auth/decorators/gql-user.decorator";
import { CommentSchema, UserSchema } from "../entities";
import { CommentService } from "./comment.service";
import { CreateCommentInput, EditCommentInput } from "../graphql";
@Resolver('Comment')
@UseGuards(GraphQLAuthGaurd)
export class CommentResolver {
    constructor(
        private readonly commentService: CommentService,
        private readonly taskService: TaskService
    ) { }

    @Mutation('createComment')
    async createComment(
        @Args('input') { content, taskId }: CreateCommentInput,
        @GetUserGQL() user: UserSchema
    ): Promise<CommentSchema> {
        return this.commentService.createComment(taskId, content, user);
    }

    @Mutation('deleteComment')
    async deleteComment(
        @Args('commentId') commentId: string,
        @GetUserGQL() user: UserSchema
    ): Promise<CommentSchema> {
        return this.commentService.deleteComment(commentId, user);
    }

    @Mutation('updateComment')
    async updateComment(
        @Args('id') commentId: string,
        @Args('input') { content }: EditCommentInput,
        @GetUserGQL() user: UserSchema
    ): Promise<CommentSchema> {
        return this.commentService.editComment(commentId, content, user);
    }

    @Query('comments')
    async comments(
        @Args('taskId') taskId: string,
    ): Promise<CommentSchema[]> {
        return this.commentService.findCommentsByTaskId(taskId);
    }

    @ResolveField('task')
    async task(@Parent() comment: CommentSchema) {
        return comment.task;
    }
}


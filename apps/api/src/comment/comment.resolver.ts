import { UseGuards } from '@nestjs/common';
import {
  Resolver,
  Query,
  Args,
  ResolveField,
  Parent,
  Mutation,
} from '@nestjs/graphql';
import { GraphQLAuthGaurd } from '../auth/guards/gql-auth-guard';
import { GetUserGQL } from '../auth/decorators/gql-user.decorator';
import { CommentSchema, UserSchema } from '../entities';
import { CommentService } from './comment.service';
import { CreateCommentInput, EditCommentInput } from '../graphql';
import { TaskService } from '../task/task.service';
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
    console.log('d5alt');
    return this.commentService.createComment(taskId, content, user);
  }

  @Mutation('deleteComment')
  async deleteComment(
    @Args('commentId') commentId: string,
    @GetUserGQL() user: UserSchema
  ): Promise<CommentSchema> {
    return this.commentService.deleteComment(commentId, user);
  }

  @Mutation('editComment')
  async editComment(
    @Args('id') commentId: string,
    @Args('input') { content }: EditCommentInput,
    @GetUserGQL() user: UserSchema
  ): Promise<CommentSchema> {
    return this.commentService.editComment(commentId, content, user);
  }

  @Query('comments')
  async comments(@Args('taskId') taskId: string): Promise<CommentSchema[]> {
    return this.commentService.find({ where: { task: { id: taskId } } });
  }

  @ResolveField('task')
  async task(@Parent() comment: CommentSchema) {
    return this.commentService
      .findOne({ where: { id: comment.id }, relations: ['task'] })
      .then((comment) => comment.task);
  }

  @ResolveField('user')
  async user(@Parent() comment: CommentSchema) {
    return this.commentService
      .findOne({ where: { id: comment.id }, relations: ['user'] })
      .then((comment) => comment.user);
  }
}

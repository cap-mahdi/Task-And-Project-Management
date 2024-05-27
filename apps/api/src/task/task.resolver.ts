import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
  Query,
} from '@nestjs/graphql';
import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { GraphQLAuthGaurd } from '../auth/guards/gql-auth-guard';
import { TaskService } from './task.service';
import { GetUserGQL } from '../auth/decorators/gql-user.decorator';
import { UserSchema } from '../entities';
import { CreateTaskDto } from './createTask.dto';
import { UpdateTaskDto } from './updateTask.dto';
import { Task, TaskFilter } from '../graphql';

@Resolver('Task')
@UseGuards(GraphQLAuthGaurd)
export class TaskResolver {
  constructor(private taskService: TaskService) { }

  @Query('tasks')
  async tasks(
    @Args('filter') filter: TaskFilter,
    @GetUserGQL() user: UserSchema
  ) {
    console.log('filter***************', filter);
    return this.taskService.findUserTasks(user, filter);
  }

  @Mutation('createTask')
  async createTask(
    @Args('input') input: CreateTaskDto,
    @Args('milestoneId', { type: () => String }, ParseUUIDPipe)
    milestoneId: string,
    @GetUserGQL() user: UserSchema
  ) {
    return this.taskService.createTask(input, user, milestoneId);
  }

  @Mutation('updateTask')
  async updateTask(
    @Args('input') input: UpdateTaskDto,
    @Args('id', { type: () => String }, ParseUUIDPipe)
    taskId: string,
    @GetUserGQL() user: UserSchema
  ) {
    const t = await this.taskService.updateTask(taskId, input, user);
    console.log('task updated', t);
    return t;
  }

  @Mutation('deleteTask')
  async deleteTask(
    @Args('id', { type: () => String }, ParseUUIDPipe)
    taskId: string,
    @GetUserGQL() user: UserSchema
  ) {
    return this.taskService.deleteTask(taskId, user);
  }

  @ResolveField('creator')
  async creator(@Parent() task: Task) {
    return this.taskService
      .findOne({ where: { id: task.id }, relations: ['creator'] })
      .then((task) => task.creator);
  }
  @ResolveField('userTasks')
  async userTasks(@Parent() task: Task) {
    const t = await this.taskService
      .findOne({ where: { id: task.id }, relations: ['userTasks'] })
      .then((task) => task.userTasks);
    console.log('userTasks', t);
    return t;
  }
  @ResolveField('comments')
  async comments(@Parent() task: Task) {
    return this.taskService
      .findOne({ where: { id: task.id }, relations: ['comments'] })
      .then((task) => task.comments);
  }
  @ResolveField('milestone')
  async milestone(@Parent() task: Task) {
    return this.taskService
      .findOne({ where: { id: task.id }, relations: ['milestone'] })
      .then((task) => task.milestone);
  }
}

import { UseGuards } from '@nestjs/common';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { GraphQLAuthGaurd } from '../auth/guards/gql-auth-guard';
import { UserTask } from '../graphql';
import { UserTaskService } from './user-task.service';

@Resolver('UserTask')
@UseGuards(GraphQLAuthGaurd)
export class UserTaskResolver {
  constructor(private readonly userTaskService: UserTaskService) {}

  @ResolveField('user')
  async user(@Parent() userTask: UserTask) {
    console.log('PARENENENEENENENENENNT userTask', userTask);
    return this.userTaskService
      .findOne({
        where: { id: userTask.id },
        relations: ['user'],
      })
      .then((res) => res.user);
  }
  @ResolveField('task')
  async task(@Parent() userTask: UserTask) {
    return this.userTaskService
      .findOne({ where: { id: userTask.id }, relations: ['task'] })
      .then((res) => res.task);
  }
}

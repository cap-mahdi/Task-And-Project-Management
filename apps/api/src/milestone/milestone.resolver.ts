import {
  Args,
  Mutation,
  Resolver,
  Query,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { GraphQLAuthGaurd } from '../auth/guards/gql-auth-guard';
import { MilestoneService } from './milestone.service';
import { createMilestoneDto } from './createMilestone.dto';
import { Milestone, ProjectRole, UpdateMilestone } from '../graphql';
import { GetUserGQL } from '../auth/decorators/gql-user.decorator';
import { UserSchema } from '../entities';
import { ProjectRoles } from '../auth/decorators/project-roles.decorator';

@Resolver('Milestone')
@UseGuards(GraphQLAuthGaurd)
export class MilestoneResolver {
  constructor(private milestoneService: MilestoneService) {}

  @Mutation('createMilestone')
  @ProjectRoles(ProjectRole.Project_ADMIN, ProjectRole.Project_EDITOR)
  async createMilestone(
    @Args('projectId', { type: () => String }, ParseUUIDPipe) projectId: string,
    @Args('input') createMilestone: createMilestoneDto,
    @GetUserGQL() user: UserSchema
  ): Promise<Milestone> {
    return this.milestoneService.createMilestone(
      createMilestone,
      projectId,
      user,
      Reflect.getMetadata('roles', this.createMilestone)
    );
  }

  @Mutation('updateMilestone')
  @ProjectRoles(ProjectRole.Project_ADMIN, ProjectRole.Project_EDITOR)
  async updateMilestone(
    @Args('id', { type: () => String }, ParseUUIDPipe) milestoneId: string,
    @Args('input') updateMilestone: UpdateMilestone,
    @GetUserGQL() user: UserSchema
  ): Promise<Milestone> {
    return this.milestoneService.updateMilestone(
      milestoneId,
      updateMilestone,
      user,
      Reflect.getMetadata('roles', this.updateMilestone)
    );
  }

  @Mutation('deleteMilestone')
  @ProjectRoles(ProjectRole.Project_ADMIN, ProjectRole.Project_EDITOR)
  async deleteMilestone(
    @Args('id', { type: () => String }, ParseUUIDPipe) milestoneId: string,
    @GetUserGQL() user: UserSchema
  ): Promise<Milestone> {
    return this.milestoneService.deleteMilestone(
      milestoneId,
      user,
      Reflect.getMetadata('roles', this.deleteMilestone)
    );
  }

  @Query('milestones')
  @ProjectRoles(
    ProjectRole.Project_ADMIN,
    ProjectRole.Project_EDITOR,
    ProjectRole.Project_MEMBER
  )
  async milestones(
    @Args('projectId') projectId: string,
    @GetUserGQL() user: UserSchema
  ): Promise<Milestone[]> {
    return this.milestoneService.findMilestonesByProjectId(
      projectId,
      user,
      Reflect.getMetadata('roles', this.milestones)
    );
  }
  @Query('milestone')
  @ProjectRoles(
    ProjectRole.Project_ADMIN,
    ProjectRole.Project_EDITOR,
    ProjectRole.Project_MEMBER
  )
  async milestone(
    @Args('id') id: string,
    @GetUserGQL() user: UserSchema
  ): Promise<Milestone> {
    return this.milestoneService.findMilestonesById(
      id,
      user,
      Reflect.getMetadata('roles', this.milestones)
    );
  }

  @ResolveField('tasks')
  async tasks(@Parent() milestone: Milestone) {
    return this.milestoneService
      .findOne({
        where: { id: milestone.id },
        relations: ['tasks'],
      })
      .then((milestone) => milestone.tasks);
  }
}

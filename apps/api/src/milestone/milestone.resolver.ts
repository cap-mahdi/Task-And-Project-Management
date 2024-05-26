import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GraphQLAuthGaurd } from '../auth/guards/gql-auth-guard';
import { MilestoneService } from './milestone.service';
import { createMilestoneDto } from './createMilestone.dto';
import { Milestone, ProjectRole, UpdateMilestone } from '../graphql';
import { GetUserGQL } from '../auth/decorators/gql-user.decorator';
import { UserSchema } from '../entities';
import { ProjectRoles } from '../auth/decorators/project-roles.decorator';

@Resolver('Workspace')
@UseGuards(GraphQLAuthGaurd)
export class MilestoneResolver {
  constructor(private milestoneService: MilestoneService) {}

  @Mutation('createMilestone')
  @ProjectRoles(ProjectRole.Project_ADMIN, ProjectRole.Project_EDITOR)
  async createMilestone(
    @Args('projectId') projectId: string,
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
    @Args('id') milestoneId: string,
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
    @Args('id') milestoneId: string,
    @GetUserGQL() user: UserSchema
  ): Promise<Milestone> {
    return this.milestoneService.deleteMilestone(
      milestoneId,
      user,
      Reflect.getMetadata('roles', this.deleteMilestone)
    );
  }
}

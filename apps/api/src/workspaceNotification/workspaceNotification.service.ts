import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FindManyOptions, Repository } from 'typeorm';
import EventEmitter2 from 'eventemitter2';
import { UserSchema, UserWorkspaceSchema } from '../entities';
import { OnEvent } from '@nestjs/event-emitter';
import { Action } from '../graphql';
import { WorkspaceNotificationSchema } from '../entities/WorkspaceNotification.entity';

@Injectable()
export class WorkspaceNotificationService {
  constructor(
    @InjectRepository(WorkspaceNotificationSchema)
    private readonly workspaceNotificationRepository: Repository<WorkspaceNotificationSchema>,
    private readonly eventEmitter: EventEmitter2
  ) {}

  async markWorkspaceNotificationAsRead(id: string) {
    const workspaceNotification =
      await this.workspaceNotificationRepository.findOne({ where: { id } });
    workspaceNotification.read = true;
    return this.workspaceNotificationRepository.save(workspaceNotification);
  }

  @OnEvent('user.workspace.added')
  async handleUserWorkspaceAdd({
    userWorkspace,
    user,
  }: {
    userWorkspace: UserWorkspaceSchema;
    user: UserSchema;
  }) {
    console.log('got aaaaaaaaa: ', userWorkspace, user);
    const workspaceNotification =
      await this.workspaceNotificationRepository.save({
        actor: user,
        recipient: userWorkspace.user,
        workspace: userWorkspace.workspace,
        action: Action.ADD,
        read: false,
      });
    const populatedWorkspaceNotification =
      await this.workspaceNotificationRepository.findOne({
        where: { id: workspaceNotification.id },
        relations: ['actor', 'recipient', 'workspace'],
      });
    console.log('workspaceNotification', workspaceNotification);
    this.eventEmitter.emit(
      'workspace.notification',
      populatedWorkspaceNotification
    );
    return workspaceNotification;
  }

  async find(option?: FindManyOptions<WorkspaceNotificationSchema>) {
    return this.workspaceNotificationRepository.find(option);
  }

  async findOne(option?: FindManyOptions<WorkspaceNotificationSchema>) {
    return this.workspaceNotificationRepository.findOne(option);
  }
}

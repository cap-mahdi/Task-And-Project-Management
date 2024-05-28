import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FindManyOptions, Repository } from 'typeorm';
import { ProjectNotificationSchema } from '../entities/ProjectNotification.entity';
import EventEmitter2 from 'eventemitter2';
import { UserProjectSchema, UserSchema } from '../entities';
import { OnEvent } from '@nestjs/event-emitter';
import { Action } from '../graphql';

@Injectable()
export class ProjectNotificationService {

    constructor(
        @InjectRepository(ProjectNotificationSchema)
        private readonly projectNotificationRepository: Repository<ProjectNotificationSchema>,
        private readonly eventEmitter: EventEmitter2

    ) { }

    async markProjectNotificationAsRead(id: string) {
        const projectNotification = await this.projectNotificationRepository.findOne({ where: { id } });
        projectNotification.read = true;
        return this.projectNotificationRepository.save(projectNotification);
    }

    @OnEvent('user.project.added')
    async handleUserProjectAdd({ userProject, user }: { userProject: UserProjectSchema, user: UserSchema }) {
        console.log('got: ', userProject, user);
        const projectNotification = await this.projectNotificationRepository.save({
            actor: user,
            recipient: userProject.user,
            project: userProject.project,
            action: Action.ADD,
            read: false
        });
        console.log('projectNotification', projectNotification);
        this.eventEmitter.emit('project.notification', projectNotification);
        return projectNotification;
    }

    async find(option?: FindManyOptions<ProjectNotificationSchema>) {
        return this.projectNotificationRepository.find(option);
    }

    async findOne(option?: FindManyOptions<ProjectNotificationSchema>) {
        return this.projectNotificationRepository.findOne(option);
    }



}

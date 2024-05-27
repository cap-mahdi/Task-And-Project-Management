import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, FindOneOptions, Repository } from "typeorm";
import { CommentSchema, UserSchema } from "../entities";
import { TaskService } from "../task/task.service";
import { MilestoneService } from "../milestone/milestone.service";
import { UserProjectService } from "../user-project/user-project.service";
import EventEmitter2 from "eventemitter2";

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(CommentSchema)
        private readonly commentRepository: Repository<CommentSchema>,
        private readonly taskService: TaskService,
        private readonly milestoneService: MilestoneService,
        private readonly userProjectService: UserProjectService,
        private readonly eventEmitter: EventEmitter2
    ) { }

    async find(options?: FindManyOptions<CommentSchema>) {
        return this.commentRepository.find(options);
    }
    async findOne(options?: FindOneOptions<CommentSchema>) {
        return this.commentRepository.findOne(options);
    }

    async createComment(taskId: string, content: string, user: UserSchema): Promise<CommentSchema> {
        const task = await this.taskService.findOne({ where: { id: taskId }, relations: ['milestone'] });

        if (!task) {
            throw new Error('Task not found');
        }


        const project =
            await this.milestoneService
                .findOne({ where: { id: task.milestone.id }, relations: ['project'] })
                .then((milestone) => milestone.project);

        if (!project) {
            throw new Error('Project not found');
        }


        if (!(await this.userProjectService.isMemberOfProject(user.id, project.id))) {
            throw new Error('Unauthorized to comment on this project');
        }


        const comment = await this.commentRepository.save({
            content,
            user,
            task
        });
        this.eventEmitter.emit('comment.created', comment);
        console.log('comment created');
        return comment;
    }

    async editComment(commentId: string, content: string, user: UserSchema): Promise<CommentSchema> {
        console.log('commentId', commentId)
        const comment = await this.commentRepository.findOne({ where: { id: commentId }, relations: ['user', 'task'] });

        if (!comment) {
            throw new Error('Comment not found');
        }

        console.log('comment', comment);
        console.log('user', user);

        if (comment.user.id !== user.id) {
            throw new Error('Unauthorized to edit comment');
        }

        comment.content = content;
        await this.commentRepository.save(comment);
        this.eventEmitter.emit('comment.updated', comment);
        console.log('comment updated');
        return comment;
    }

    async deleteComment(commentId: string, user: UserSchema): Promise<CommentSchema> {
        const comment = await this.commentRepository.findOne({ where: { id: commentId }, relations: ['user', 'task'] });

        if (!comment) {
            throw new Error('Comment not found');
        }

        if (comment.user.id !== user.id) {
            throw new Error('Unauthorized to delete comment');
        }

        await this.commentRepository.softDelete(comment);
        this.eventEmitter.emit('comment.deleted', comment);
        console.log('comment deleted');
        return comment;
    }


}
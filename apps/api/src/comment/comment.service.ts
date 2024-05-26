import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CommentSchema, UserSchema } from "../entities";

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(CommentSchema)
        private readonly commentRepository: Repository<CommentSchema>,

        private readonly taskService: TaskService
    ) { }

    async findCommentsByTaskId(taskId: string): Promise<CommentSchema[]> {
        const comments = await this.commentRepository.find({
            where: {
                task: { id: taskId }
            }, relations: ['user']
        });

        return comments;
    }

    async findCommentById(commentId: string): Promise<CommentSchema> {
        const comment = await this.commentRepository.findOne({
            where: {
                id: commentId
            }, relations: ['user', 'task']
        });

        if (!comment) {
            throw new Error('Comment not found');
        }

        return comment;
    }

    async createComment(taskId: string, content: string, user: UserSchema): Promise<CommentSchema> {
        const task = await this.taskService.findTaskById(taskId);

        return this.commentRepository.save({
            content,
            user,
            task
        });
    }

    async editComment(commentId: string, content: string, user: UserSchema): Promise<CommentSchema> {
        const comment = await this.findCommentById(commentId);

        if (comment.user !== user) {
            throw new Error('Unauthorized to edit comment');
        }

        comment.content = content;
        return this.commentRepository.save(comment);
    }

    async deleteComment(commentId: string, user: UserSchema): Promise<CommentSchema> {
        const comment = await this.findCommentById(commentId);

        if (comment.user !== user) {
            throw new Error('Unauthorized to delete comment');
        }

        await this.commentRepository.softDelete(comment);
        return comment;
    }


}
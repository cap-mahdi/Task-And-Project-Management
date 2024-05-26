import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CommentSchema } from "../entities";

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(CommentSchema)
        private readonly commentRepository: Repository<CommentSchema>
    ) { }

    async findCommentsByTaskId(taskId: string): Promise<CommentSchema[]> {
        const comments = await this.commentRepository.find({
            where: {
                task: { id: taskId }
            }, relations: ['user']
        });

        return comments;
    }
}
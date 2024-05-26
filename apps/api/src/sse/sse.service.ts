import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Observable, fromEvent, merge } from "rxjs";
import { filter, map } from 'rxjs/operators';
import { CommentSchema, UserSchema } from "../entities";

@Injectable()
export class sseService {
    constructor(private readonly eventEmitter: EventEmitter2) { }

    sse(user: UserSchema, taskId: string): Observable<MessageEvent> {
        const createCommentEvent = fromEvent(this.eventEmitter, 'comment.created').pipe(
            filter((comment: CommentSchema) => comment.task.id === taskId),
            map((comment: CommentSchema) => new MessageEvent('create-comment', { data: JSON.stringify(comment) }))
        )

        const deleteCommentEvent = fromEvent(this.eventEmitter, 'comment.deleted').pipe(
            filter((comment: CommentSchema) => comment.task.id === taskId),
            map((comment: CommentSchema) => new MessageEvent('delete-comment', { data: JSON.stringify(comment) }))
        )

        const editCommentEvent = fromEvent(this.eventEmitter, 'comment.edited').pipe(
            filter((comment: CommentSchema) => comment.task.id === taskId),
            map((comment: CommentSchema) => new MessageEvent('edit-comment', { data: JSON.stringify(comment) }))
        )

        return merge(createCommentEvent, deleteCommentEvent, editCommentEvent);
    }
}
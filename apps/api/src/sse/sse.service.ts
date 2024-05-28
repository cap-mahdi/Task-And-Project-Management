import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Observable, fromEvent, merge } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { CommentSchema, UserSchema } from '../entities';
import { ProjectNotificationSchema } from '../entities/ProjectNotification.entity';

@Injectable()
export class sseService {
  constructor(private readonly eventEmitter: EventEmitter2) { }

  sse(user: UserSchema, taskId: string): Observable<MessageEvent> {
    const createCommentEvent = fromEvent(
      this.eventEmitter,
      'comment.created'
    ).pipe(
      filter((comment: CommentSchema) => comment.task.id === taskId),
      map(
        (comment: CommentSchema) =>
          new MessageEvent('create-comment', { data: JSON.stringify(comment) })
      )
    );

    const deleteCommentEvent = fromEvent(
      this.eventEmitter,
      'comment.deleted'
    ).pipe(
      filter((comment: CommentSchema) => comment.task.id === taskId),
      map(
        (comment: CommentSchema) =>
          new MessageEvent('delete-comment', { data: JSON.stringify(comment) })
      )
    );

    const editCommentEvent = fromEvent(
      this.eventEmitter,
      'comment.edited'
    ).pipe(
      filter((comment: CommentSchema) => comment.task.id === taskId),
      map(
        (comment: CommentSchema) =>
          new MessageEvent('edit-comment', { data: JSON.stringify(comment) })
      )
    );


    return merge(createCommentEvent, deleteCommentEvent, editCommentEvent);
  }


  sseNotif(user: UserSchema): Observable<MessageEvent> {
    const createProjectNotifEvent = fromEvent(
      this.eventEmitter,
      'project.notification'
    ).pipe(
      tap((notif: ProjectNotificationSchema) => console.log('Received notification:', notif)),
      filter((notif: ProjectNotificationSchema) => {
        console.log('Filtering notif', notif);
        console.log('Filtering User:', user);
        return notif.recipient.id === user.id;
      }),
      map(
        (notif: ProjectNotificationSchema) =>
          new MessageEvent('project-notification', { data: JSON.stringify(notif) })
      )
    );

    const createWorkspaceNotifEvent = fromEvent(
      this.eventEmitter,
      'workspace.notification'
    ).pipe(
      tap((notif: ProjectNotificationSchema) => console.log('Received notification:', notif)),
      filter((notif: ProjectNotificationSchema) => {
        console.log('Filtering notif', notif);
        console.log('Filtering User:', user);
        return notif.recipient.id === user.id;
      }),
      map(
        (notif: ProjectNotificationSchema) =>
          new MessageEvent('workspace-notification', { data: JSON.stringify(notif) })
      )
    );

    return merge(createProjectNotifEvent, createWorkspaceNotifEvent);
  }
}

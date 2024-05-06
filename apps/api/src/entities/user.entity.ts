import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Project, User, UserRole, Workspace } from '../graphql';
import { UserWorkspaceSchema } from './userWorkspace.entity';
import { UserProjectSchema } from './userProject.entity';

import { CommentSchema } from './comment.entity';
import { MessageSchema } from './message.entity';
import { Exclude } from 'class-transformer';
import { UserRoomSchema } from './userRoom.entity';
import { UserTaskSchema } from './userTask.entity';
import { ProjectSchema } from './project.entity';
import { WorkspaceSchema } from './workspace.entity';

@Entity({
  name: 'user',
})
export class UserSchema
  implements
  Omit<User, 'userWorkspaces' | 'userProjects' | 'userRooms' | 'userTasks'> {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @OneToMany(() => UserWorkspaceSchema, (userWorkspace) => userWorkspace.user)
  userWorkspaces: UserWorkspaceSchema[];

  @OneToMany(() => UserProjectSchema, (userProject) => userProject.user)
  userProjects: UserProjectSchema[];

  @OneToMany(() => CommentSchema, (comment) => comment.user)
  comments: CommentSchema[];

  @OneToMany(() => UserTaskSchema, (userTask) => userTask.user)
  userTasks: UserTaskSchema[];

  @OneToMany(() => UserRoomSchema, (userRooms) => userRooms.user)
  userRooms: UserRoomSchema[];

  @OneToMany(() => MessageSchema, (message) => message.sender)
  messages: MessageSchema[];

  @OneToMany(() => ProjectSchema, (project) => project.creator)
  createdProjects: Project[];

  @OneToMany(() => WorkspaceSchema, (workspace) => workspace.creator)
  createdWorkspaces: Workspace[];

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}

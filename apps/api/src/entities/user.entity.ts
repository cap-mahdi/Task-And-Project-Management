import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User, UserRole } from '../graphql';
import { UserWorkspaceSchema } from './userWorkspace.entity';
import { UserProjectSchema } from './userProject.entity';
import { RoomSchema } from './room.entity';
import { TaskSchema } from './task.entity';
import { CommentSchema } from './comment.entity';
import { MessageSchema } from './message.entity';

@Entity({
  name: 'user',
})
export class UserSchema implements Omit<User, 'workspaces' | 'projects'> {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @OneToMany(() => UserWorkspaceSchema, (userWorkspace) => userWorkspace.user)
  workspaces: string[];

  @OneToMany(() => UserProjectSchema, (userProject) => userProject.user)
  projects: string[];

  @OneToMany(() => CommentSchema, (comment) => comment.user)
  comments: string[];

  @ManyToMany(() => TaskSchema, (task) => task.assignees)
  @JoinTable()
  tasks: string[];

  @ManyToMany(() => RoomSchema, (room) => room.users)
  @JoinTable()
  rooms: string[];

  @OneToMany(() => MessageSchema, (message) => message.sender)
  messages: string[];
}

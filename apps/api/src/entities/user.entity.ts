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
import { Exclude } from 'class-transformer';

@Entity({
  name: 'user',
})
export class UserSchema
  implements Omit<User, 'userWorkspaces' | 'userProjects'>
{
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

import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Comment } from '../graphql';
import { UserSchema } from './user.entity';
import { TaskSchema } from './task.entity';

@Entity({
  name: 'comment',
})
export class CommentSchema implements Omit<Comment, 'task' | 'user'> {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  content: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ManyToOne(() => UserSchema, (user) => user.comments)
  user: string;

  @ManyToOne(() => TaskSchema, (task) => task.comments)
  task: string;
}

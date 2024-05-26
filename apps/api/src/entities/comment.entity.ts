import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Comment } from '../graphql';
import { UserSchema } from './user.entity';
import { TaskSchema } from './task.entity';

@Entity({
  name: 'comment',
})
export class CommentSchema implements Omit<Comment, 'task' | 'user'> {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => UserSchema, (user) => user.comments)
  user: UserSchema;

  @ManyToOne(() => TaskSchema, (task) => task.comments)
  task: TaskSchema;

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
  deletedAt: Date;
}

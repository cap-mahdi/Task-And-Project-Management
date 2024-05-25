import {
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserTask } from '../graphql';
import { UserSchema } from './user.entity';

import { TaskSchema } from './task.entity';

@Entity({
  name: 'user_task',
})
@Index(['user', 'task'], { unique: true, where: 'deleted_at IS NULL' })
export class UserTaskSchema implements Omit<UserTask, 'user' | 'task'> {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserSchema, (user) => user.userTasks)
  user: UserSchema;

  @ManyToOne(() => TaskSchema, (task) => task.userTasks)
  task: TaskSchema;

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
  deletedAt: Date;
}

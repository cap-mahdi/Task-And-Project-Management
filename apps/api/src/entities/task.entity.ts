import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserSchema } from './user.entity';
import { Status, Task } from '../graphql';
import { CommentSchema } from './comment.entity';
import { MilestoneSchema } from './milestone.entity';
import { UserTaskSchema } from './userTask.entity';

@Entity({
  name: 'task',
})
export class TaskSchema
  implements Omit<Task, 'userTasks' | 'comments' | 'milestone'>
{
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: Status })
  status: Status;

  @Column('simple-array')
  tags: string[];

  @OneToMany(() => UserTaskSchema, (userTask) => userTask.task)
  userTasks: UserTaskSchema[];

  @OneToMany(() => CommentSchema, (comment) => comment.task)
  comments: CommentSchema[];

  @ManyToOne(() => MilestoneSchema, (milestone) => milestone.tasks)
  milestone: MilestoneSchema;
  
  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}

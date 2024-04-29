import {
  Column,
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

@Entity({
  name: 'task',
})
export class TaskSchema
  implements Omit<Task, 'assignees' | 'comments' | 'milestone'>
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

  // @ManyToMany(() => UserSchema, (user) => user.tasks)
  // @JoinTable()
  assignees: string[];

  @OneToMany(() => CommentSchema, (comment) => comment.task)
  comments: string[];

  @ManyToOne(() => MilestoneSchema, (milestone) => milestone.tasks)
  milestone: string;
}

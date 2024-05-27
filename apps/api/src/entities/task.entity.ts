import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
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
  implements Omit<Task, 'userTasks' | 'comments' | 'milestone' | 'creator'>
{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: Status })
  status: Status;

  @Column('simple-array')
  tags: string[];

  @ManyToOne(() => UserSchema)
  creator: UserSchema;

  @OneToMany(() => UserTaskSchema, (userTask) => userTask.task)
  userTasks: UserTaskSchema[];

  @OneToMany(() => CommentSchema, (comment) => comment.task)
  comments: CommentSchema[];

  @ManyToOne(() => MilestoneSchema, (milestone) => milestone.tasks)
  milestone: MilestoneSchema;

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
  deletedAt: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}

import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Milestone, Status } from '../graphql';
import { ProjectSchema } from './project.entity';
import { TaskSchema } from './task.entity';

@Entity({
  name: 'milestone',
})
export class MilestoneSchema implements Omit<Milestone, 'tasks' | 'project'> {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column({ type: 'enum', enum: Status })
  status: Status;

  @ManyToOne(() => ProjectSchema, (project) => project.milestones)
  project: ProjectSchema;

  @OneToMany(() => TaskSchema, (task) => task.milestone)
  tasks: TaskSchema[];

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
  deletedAt: Date;
}

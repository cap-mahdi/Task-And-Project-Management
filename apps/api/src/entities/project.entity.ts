import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Project } from '../graphql';
import { WorkspaceSchema } from './workspace.entity';
import { UserSchema } from './user.entity';
import { MilestoneSchema } from './milestone.entity';
import { RoomSchema } from './room.entity';
import { UserProjectSchema } from './userProject.entity';

@Entity({
  name: 'project',
})
export class ProjectSchema
  implements
    Omit<Project, 'workspace' | 'userProjects' | 'rooms' | 'milestones'>
{
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ManyToOne(() => WorkspaceSchema, (workspace) => workspace.projects)
  workspace: WorkspaceSchema;

  @OneToMany(() => RoomSchema, (room) => room.project)
  rooms: string[];

  @OneToMany(() => UserProjectSchema, (userProject) => userProject.project)
  userProjects: UserProjectSchema[];

  @OneToMany(() => MilestoneSchema, (milestone) => milestone.project)
  milestones: string[];
}

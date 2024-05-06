import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Project, User } from '../graphql';
import { WorkspaceSchema } from './workspace.entity';
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
  rooms: RoomSchema[];

  @OneToMany(() => UserProjectSchema, (userProject) => userProject.project)
  userProjects: UserProjectSchema[];

  @OneToMany(() => MilestoneSchema, (milestone) => milestone.project)
  milestones: MilestoneSchema[];

  @ManyToOne(() => UserSchema, (user) => user.createdProjects)
  creator: User;

  @ManyToOne(() => UserSchema, (user) => user.createdProjects)
  creator: User;

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
  deletedAt: Date;
}

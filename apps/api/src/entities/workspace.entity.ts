import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Workspace } from '../graphql';
import { UserWorkspaceSchema } from './userWorkspace.entity';
import { ProjectSchema } from './project.entity';

@Entity({
  name: 'workspace',
})
export class WorkspaceSchema implements Omit<Workspace, 'users' | 'projects'> {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @OneToMany(
    () => UserWorkspaceSchema,
    (userWorkspace) => userWorkspace.workspace
  )
  users: string[];

  @OneToMany(() => ProjectSchema, (project) => project.workspace)
  projects: string[];
}

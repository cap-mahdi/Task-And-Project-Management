import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Workspace } from '../graphql';
import { UserWorkspaceSchema } from './userWorkspace.entity';
import { ProjectSchema } from './project.entity';
import { UserSchema } from './user.entity';

@Entity({
  name: 'workspace',
})
export class WorkspaceSchema
  implements Omit<Workspace, 'userWorkspaces' | 'projects'>
{
  @PrimaryGeneratedColumn('uuid')
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
  userWorkspaces: UserWorkspaceSchema[];

  @OneToMany(() => ProjectSchema, (project) => project.workspace)
  projects: ProjectSchema[];

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}

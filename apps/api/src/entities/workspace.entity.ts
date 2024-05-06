import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User, Workspace } from '../graphql';
import { UserWorkspaceSchema } from './userWorkspace.entity';
import { ProjectSchema } from './project.entity';
import { UserSchema } from './user.entity';

@Entity({
  name: 'workspace',
})
export class WorkspaceSchema
  implements Omit<Workspace, 'userWorkspaces' | 'projects'> {
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

  @ManyToOne(() => UserSchema, (user) => user.createdWorkspaces)
  creator: User;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}

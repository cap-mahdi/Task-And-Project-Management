import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserWorkspace, WorkspaceRole } from '../graphql';
import { UserSchema } from './user.entity';
import { WorkspaceSchema } from './workspace.entity';

@Entity({
  name: 'user_workspace',
})
@Index(['user', 'workspace', 'deletedAt'], { unique: true })
export class UserWorkspaceSchema
  implements Omit<UserWorkspace, 'workspace' | 'user'>
{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: WorkspaceRole })
  role: WorkspaceRole;
  @CreateDateColumn({ type: 'timestamp' })
  addedAt: Date;
  @ManyToOne(() => UserSchema, (user) => user.userWorkspaces)
  user: UserSchema;

  @ManyToOne(() => WorkspaceSchema, (workspace) => workspace.userWorkspaces)
  workspace: WorkspaceSchema;

  @DeleteDateColumn({ type: 'text', default: '' })
  deletedAt: Date;
}

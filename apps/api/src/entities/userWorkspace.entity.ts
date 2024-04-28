import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserWorkspace, WorkspaceRole } from '../graphql';
import { UserSchema } from './user.entity';
import { WorkspaceSchema } from './workspace.entity';

@Entity({
  name: 'user_workspace',
})
export class UserWorkspaceSchema
  implements Omit<UserWorkspace, 'workspace' | 'user'>
{
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'enum', enum: WorkspaceRole })
  role: WorkspaceRole;

  @ManyToOne(() => UserSchema, (user) => user.workspaces)
  user: string;

  @ManyToOne(() => WorkspaceSchema, (workspace) => workspace.users)
  workspace: string;
}

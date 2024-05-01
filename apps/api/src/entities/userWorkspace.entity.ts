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
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: WorkspaceRole })
  role: WorkspaceRole;

  @ManyToOne(() => UserSchema, (user) => user.userWorkspaces)
  user: UserSchema;

  @ManyToOne(() => WorkspaceSchema, (workspace) => workspace.userWorkspaces)
  workspace: WorkspaceSchema;
}

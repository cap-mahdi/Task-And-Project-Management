import { Workspace } from './Workspace';
import { BasicShema } from './basicShema';
import { UserRole, WorkspaceRole } from './enums';
// import { User } from '../../../../../apps/api/src/graphql';
export type User = BasicShema & {
  name: string;
  email: string;
  password: string;
  workspaces: [{ workspace: string | Workspace; role: WorkspaceRole }];
  role: UserRole;
};

// export interface UserInterface extends User {}

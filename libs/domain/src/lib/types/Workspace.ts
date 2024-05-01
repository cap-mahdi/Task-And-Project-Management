import { Project } from './Project';
import { User } from './User';
import { BasicShema } from './basicShema';
import { WorkspaceRole } from './enums';

export type Workspace = BasicShema & {
  name: string;
  description: string;
  users: [{ user: string | User; role: WorkspaceRole }];
  projects: string[] | Project[];
};

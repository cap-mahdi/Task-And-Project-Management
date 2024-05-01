import { Project } from './Project';
import { User } from './User';
import { BasicShema } from './basicShema';
import { ProjectRole } from './enums';

export type Team = BasicShema & {
  project: string | Project;
  members: [{ user: User | string; role: ProjectRole }];
};

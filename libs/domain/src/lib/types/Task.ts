import { Milestone } from './Milestone';
import { User } from './User';
import { BasicShema } from './basicShema';
import { Status } from './enums';

export type Task = BasicShema & {
  name: string;
  description: string;
  status: Status;
  assignees: string[] | User[];
  // tags: string[]; probably ki yebda 3andna wa9t hh
  mileStone: Milestone | string;
  comments: Comment[] | string[];
};

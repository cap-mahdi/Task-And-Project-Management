import { Project } from './Project';
import { Task } from './Task';
import { BasicShema } from './basicShema';
import { Status } from './enums';

export type Milestone = BasicShema & {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: Status;
  tasks: Task[] | string[];
  project: string | Project;
};

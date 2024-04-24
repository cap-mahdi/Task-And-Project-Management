import { Task } from './Task';
import { User } from './User';
import { BasicShema } from './basicShema';

export type Comment = BasicShema & {
  content: string;
  task: string | Task;
  user: string | User;
};

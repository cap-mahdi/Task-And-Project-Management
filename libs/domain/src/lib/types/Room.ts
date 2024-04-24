import { Message } from './Message';
import { Project } from './Project';
import { User } from './User';
import { BasicShema } from './basicShema';

export type Room = BasicShema & {
  messages: Message[] | string[];
  project: Project | string;
  users: string[] | User[];
};

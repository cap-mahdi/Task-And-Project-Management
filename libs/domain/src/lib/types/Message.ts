import { Room } from './Room';
import { User } from './User';
import { BasicShema } from './basicShema';

export type Message = BasicShema & {
  room: Room | string;
  users: string[] | User[];
};

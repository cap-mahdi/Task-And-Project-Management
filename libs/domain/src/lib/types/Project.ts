import { Room } from './Room';
import { Team } from './Team';
import { Workspace } from './Workspace';
import { BasicShema } from './basicShema';

export type Project = BasicShema & {
  name: string;
  descritpion: string;
  team: Team | string;
  worspace: Workspace | string;
  rooms: string[] | Room[];
};

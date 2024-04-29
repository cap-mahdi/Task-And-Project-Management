import {
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Room } from '../graphql';
import { ProjectSchema } from './project.entity';
import { UserSchema } from './user.entity';

@Entity({
  name: 'room',
})
export class RoomSchema
  implements Omit<Room, 'project' | 'users' | 'messages'>
{
  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ManyToOne(() => ProjectSchema, (project) => project.rooms)
  project: string;

  // @ManyToMany(() => UserSchema, (user) => user.rooms)
  // @JoinTable()
  users: string[];

  // @OneToMany(() => MessageSchema, (message) => message.room)
  messages: string[];
}

import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Room } from '../graphql';
import { ProjectSchema } from './project.entity';
import { UserRoomSchema } from './userRoom.entity';
import { MessageSchema } from './message.entity';

@Entity({
  name: 'room',
})
export class RoomSchema
  implements Omit<Room, 'project' | 'userRooms' | 'messages'>
{
  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ManyToOne(() => ProjectSchema, (project) => project.rooms)
  project: ProjectSchema;

  @OneToMany(() => UserRoomSchema, (user) => user.room)
  userRooms: UserRoomSchema[];

  @OneToMany(() => MessageSchema, (message) => message.room)
  messages: MessageSchema[];

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
  deletedAt: Date;
}

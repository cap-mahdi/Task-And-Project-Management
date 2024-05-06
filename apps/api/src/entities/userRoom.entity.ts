import {
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserSchema } from './user.entity';

import { RoomSchema } from './room.entity';
import { UserRoom } from '../graphql';

@Entity({
  name: 'user_room',
})
@Index(['user', 'room'], { unique: true, where: 'deleted_at IS NULL' })
export class UserRoomSchema implements Omit<UserRoom, 'user' | 'room'> {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserSchema, (user) => user.userRooms)
  user: UserSchema;

  @ManyToOne(() => RoomSchema, (project) => project.userRooms)
  room: RoomSchema;

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
  deletedAt: Date;
}

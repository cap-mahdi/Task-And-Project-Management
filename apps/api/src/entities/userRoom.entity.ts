import { Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProjectRole, UserRoom } from '../graphql';
import { UserSchema } from './user.entity';

import { RoomSchema } from './room.entity';

@Entity({
  name: 'user_room',
})
export class UserRoomSchema implements Omit<UserRoom, 'user' | 'room'> {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: ProjectRole })
  role: ProjectRole;

  @ManyToOne(() => UserSchema, (user) => user.userRooms)
  user: UserSchema;

  @ManyToOne(() => RoomSchema, (project) => project.userRooms)
  room: RoomSchema;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}

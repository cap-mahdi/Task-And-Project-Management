import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Message } from '../graphql';
import { RoomSchema } from './room.entity';
import { UserSchema } from './user.entity';

@Entity({
  name: 'message',
})
export class MessageSchema implements Omit<Message, 'room' | 'sender'> {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  content: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ManyToOne(() => RoomSchema, (room) => room.messages)
  room: string;

  @ManyToOne(() => UserSchema, (user) => user.messages)
  sender: string;
}

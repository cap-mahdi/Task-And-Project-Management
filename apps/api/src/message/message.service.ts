import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, In, Repository } from 'typeorm';
import { MessageSchema } from '../entities';
import { RoomService } from '../room/room.service';
import { UserService } from '../user/user.service';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageSchema)
    private messageRepository: Repository<MessageSchema>,
    private readonly roomService: RoomService,
    private readonly userService: UserService
  ) {}

  async createMessage(
    content: string,
    roomId: string,
    senderId: string
  ): Promise<MessageSchema> {
    const room = await this.roomService.getRoomById(roomId);
    const sender = await this.userService.getUserById(senderId);
    const message = new MessageSchema();
    message.content = content;
    message.room = room;
    message.sender = sender;
    return this.messageRepository.save(message);
  }

  async findOne(
    options?: FindManyOptions<MessageSchema>
  ): Promise<MessageSchema> {
    return this.messageRepository.findOne(options);
  }

  async find(
    options?: FindManyOptions<MessageSchema>
  ): Promise<MessageSchema[]> {
    return this.messageRepository.find(options);
  }

  async SoftDeleteMessage(id: string): Promise<MessageSchema> {
    const message = await this.findOne({ where: { id } });
    if (!message) {
      throw new NotFoundException('Message not found');
    }
    return this.messageRepository.softRemove(message);
    // return message;
  }

  async getMessageRoom(messageId: string): Promise<string> {
    const message = await this.findOne({
      where: { id: messageId },
      relations: ['room'],
    });
    if (!message) {
      throw new NotFoundException('Message not found');
    }
    return message.room.id;
  }
}

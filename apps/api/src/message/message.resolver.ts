import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { MessageSchema, UserSchema } from '../entities';
import { MessageService } from './message.service';

@Resolver('Message')
export class MessageResolver {
  constructor(private readonly messageService: MessageService) {}

  @ResolveField('sender')
  async sender(@Parent() message: MessageSchema): Promise<UserSchema> {
    const messageFound = await this.messageService.findOne({
      where: {
        id: message.id,
      },
      withDeleted: true,
      relations: ['sender'],
    });
    return messageFound.sender;
  }
}

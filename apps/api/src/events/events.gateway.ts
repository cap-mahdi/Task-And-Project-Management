import { OnModuleInit } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Observable, of } from 'rxjs';
import { Server } from 'socket.io';
import { MessageService } from '../message/message.service';
import { create } from 'domain';
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway implements OnModuleInit {
  constructor(private readonly messageservice: MessageService) {}

  @WebSocketServer()
  server: Server;
  onModuleInit() {
    //3
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log(socket.connected);
    });
  }

  @SubscribeMessage('leaveroom')
  leaveRoom(
    @MessageBody()
    data: any,
    @ConnectedSocket()
    client: any
  ): Observable<WsResponse<any>> {
    //2
    console.log('leaveroom');
    console.log(data);
    client.leave(data);
    return of({ event: 'leaveroom', data: 'Returned from the servery' });
  }

  @SubscribeMessage('joinroom')
  joinRoom(
    @MessageBody()
    data: any,
    @ConnectedSocket()
    client: any
  ): Observable<WsResponse<any>> {
    //2
    console.log('joinroom');
    client.join(data);
    console.log(data);
    return of({ event: 'joinroom', data: 'Returned from the servery' });
  }

  @SubscribeMessage('sendmessage')
  async sendMessage(
    @MessageBody()
    data: any
  ) {
    //2
    // console.log('sendmessage');
    // console.log(data);
    const newData = await this.messageservice.createMessage(
      data.message,
      data.roomId,
      data.userId
    );
    this.server.to(data.roomId).emit('receivemessage', newData);
    return of({ event: 'sendmessage', data: 'Returned from the servery' });
  }

  @SubscribeMessage('deletemessage')
  async deleteMessage(
    @MessageBody()
    id: any
  ) {
    console.log('deletemessage', id);
    const roomId = await this.messageservice.getMessageRoom(id);
    await this.messageservice.SoftDeleteMessage(id);
    this.server.to(roomId).emit('deletemessage', id);

    return of({ event: 'deletemessage', data: 'Returned from the servery' });
  }
}

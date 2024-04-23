import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Observable, of } from 'rxjs';
import { Server } from 'socket.io';
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;
  onModuleInit() {
    //3
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log(socket.connected);
    });
  }
  // You can listen to this event
  // Client can send message to me by using the message key/event name
  @SubscribeMessage('message')
  newMessage(
    @MessageBody()
    data: any
  ): Observable<WsResponse<any>> {
    //1
    console.log('Message is receieved from the client');
    console.log(data);
    return of({ event: 'message', data: 'Returned from the servery' });
  }
}

import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { ChatAppService } from './chat.service';
import { Server } from 'https';
import { Bind } from '@nestjs/common';

@WebSocketGateway({ cors: '*:*' })
export class ChatGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly chatAppService: ChatAppService) {}

  @Bind(MessageBody(), ConnectedSocket())
  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string): void {
    // console.log('running');
    console.log(message);
    this.server.emit('message', message);
    this.chatAppService.saveChat(message);
  }
}
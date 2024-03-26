import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { ChatAppService } from './chat.service';

@WebSocketGateway(8001, { cors: '*:*' })
export class ChatGateway {
  @WebSocketServer()
  server;
  constructor(private readonly chatAppService: ChatAppService) {}
  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string): void {
    console.log('running');
    console.log(message);
    this.server.emit('message', message);
  }
}

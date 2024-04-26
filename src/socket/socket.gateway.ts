import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketService } from './socket.service';


@WebSocketGateway(8001, { cors: '*:*' })
export class SocketGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly socketService: SocketService) {}
  private connectedUsers: number = 0;
  private readonly roomCode = 'my-room';
  private enteredUsers: number = 0;

  handleConnection(socket: Socket, client: Socket) {
    this.connectedUsers++;
    this.updateConnectedUsers();
    console.log(`New Client connected`);
    this.handleSubscribeToRandomNumbers(client);
  }

  handleDisconnect(socket: Socket, client: Socket) {
    this.connectedUsers--;
    this.updateConnectedUsers();
    console.log(`Client disconnected`);
  }

  updateConnectedUsers() {
    this.server.emit('connectedUsers', this.connectedUsers);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, room: string) {
    client.join(room);
    client.emit('joinedRoom', room);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, room: string) {
    client.leave(room);
    client.emit('leftRoom', room);
  }

  // random number room
  @SubscribeMessage('subscribeToRandomNumbers')
  handleSubscribeToRandomNumbers(client: Socket) {
    setInterval(() => {
      const randomNumber = Math.floor(Math.random() * 100);
      this.server.emit('subscribeToRandomNumbers', randomNumber.toString());
      console.log('randomNumber is :', randomNumber);
    }, 5000);
  }

  // game_controls room
  @SubscribeMessage('game_controls')
  handleGameControls(
    client: Socket,
    data: { amount: number; payout: number },
  ): void {
    // bet , payout
    console.log('Received bet data:', data);
    const result = { success: true, message: 'Bet placed successfully' };
    this.server
      .to(client.rooms.values().next().value)
      .emit('betResult', result);
  }

  @SubscribeMessage('users')
  handleUsers(client: Socket) {
    client.join(this.roomCode);
    this.enteredUsers++;
    this.server.to(this.roomCode).emit('userEntered', this.enteredUsers);

    setTimeout(() => {
      client.leave(this.roomCode);
      this.enteredUsers--;
      this.server.to(this.roomCode).emit('userEntered', this.enteredUsers);
    }, 5000);
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string): void {
    this.server.emit('message', message);
    this.socketService.saveChat(message);
  }
}

/**
 * Total rooms:
 * random_number
 * game_controls
 * users
 * chat
 */

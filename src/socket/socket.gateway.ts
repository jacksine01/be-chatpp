import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketService } from './socket.service';
import * as crypto from 'crypto';

@WebSocketGateway(8001, { cors: '*:*' })
export class SocketGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly socketService: SocketService) {}
  private connectedUsers: number = 0;
  private readonly roomCode = 'my-room';
  private enteredUsers: number = 0;

  handleConnection(randomNumber: number, hash: String) {
    this.connectedUsers++;
    this.updateConnectedUsers();
    console.log(`New Client connected`);
    this.handleSubscribeToRandomNumbers(randomNumber, hash);
  }

  handleDisconnect() {
    this.connectedUsers--;
    this.updateConnectedUsers();
    console.log(`Client disconnected`);
  }

  updateConnectedUsers() {
    this.server.emit('connectedUsers', this.connectedUsers);
  }

  // @SubscribeMessage('joinRoom')
  // handleJoinRoom(client: Socket, room: string) {
  //   client.join(room);
  //   client.emit('joinedRoom', room);
  // }

  // @SubscribeMessage('leaveRoom')
  // handleLeaveRoom(client: Socket, room: string) {
  //   client.leave(room);
  //   client.emit('leftRoom', room);
  // }

  // random number room
  @SubscribeMessage('subscribeToRandomNumbers')
  handleSubscribeToRandomNumbers(randomNumber: number, hash: String): void {
    setInterval(() => {
      const randomNumber = Math.floor(Math.random() * 100);

      const randomData = crypto.randomBytes(16);
      const hash = crypto.createHash('sha256');
      hash.update(randomData);
      const hashHex = hash.digest('hex');

      this.server.emit(
        'subscribeToRandomNumbers',
        randomNumber.toString(),
        hashHex.toString(),
      );
      this.socketService.saveRandomNumber(randomNumber, hashHex);
    }, 4000);
  }

  // game_controls room
  @SubscribeMessage('game_controls')
  handleGameControls(
    client: Socket,
    data: { betAmount: string; payoutNumber: string },
  ): void {
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
    }, 7000);
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

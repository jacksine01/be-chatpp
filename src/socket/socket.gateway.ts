import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class SocketGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('subscribeToRandomNumbers')
  handleSubscribeToRandomNumbers(client: any) {
    // Subscribe the client to the 'randomNumbers' room
    client.join('randomNumbers');
  }

  sendRandomNumber() {
    // Send a random number to all clients in the 'randomNumbers' room
    this.server
      .to('randomNumbers')
      .emit('randomNumber', Math.floor(Math.random() * 100) + 1);
  }

  afterInit(server: Server) {
    // Start sending random numbers after initialization
    setInterval(() => {
      this.sendRandomNumber();
    }, 1000);
  }

  @SubscribeMessage('game_controls')
  handleGameControls(client: any) {
    // Subscribe the client to the 'randomNumbers' room
    // client.join('randomNumbers');
    // bet , payout
  }

  private connectedUsers: number = 0;

  handleConnection(socket: Socket) {
    this.connectedUsers++;
    this.updateConnectedUsers();
    console.log('New client connected');
  }

  handleDisconnect(socket: Socket) {
    this.connectedUsers--;
    this.updateConnectedUsers();
    console.log('Client disconnected');
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

  @SubscribeMessage('sendMessage')
  handleMessage(client: Socket, message: any) {
    this.server.to(message.room).emit('message', message);
  }
}

/**
 *
 * random_number
 * game_controls
 * users
 * chat
 */

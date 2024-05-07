import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatSchema } from './entities/chat.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { SocketService } from './socket.service';
import { RandomNumberSchema } from './entities/random-number.entity';
import { SocketController } from './socket.controller';
import { GameControlSchema } from './entities/game_control.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'UserChat', schema: ChatSchema },
      { name: 'RandomNumber', schema: RandomNumberSchema },
      { name: 'GameControl', schema: GameControlSchema },
    ]),

    ScheduleModule.forRoot(),
  ],
  controllers: [SocketController],
  providers: [SocketGateway, SocketService],
  exports: [MongooseModule],
})
export class SocketModule {}


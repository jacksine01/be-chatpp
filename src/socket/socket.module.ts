import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatSchema } from './entities/chat.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { SocketService } from './socket.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'UserChat', schema: ChatSchema }]),

    ScheduleModule.forRoot(),
  ],
  providers: [SocketGateway, SocketService],
  exports: [MongooseModule],
})
export class SocketModule {}


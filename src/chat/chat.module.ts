import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatAppService } from './chat.service';
import { ChatSchema } from './chat.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'chatledger', schema: ChatSchema }]),

    ScheduleModule.forRoot(),
  ],
  providers: [ChatGateway, ChatAppService],
  exports: [MongooseModule],
})
export class ChatModule {}

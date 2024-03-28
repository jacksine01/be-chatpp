import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatAppService } from './chat.service';
import { ChatSchema } from './chat.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'chatledger', schema: ChatSchema }]),
  ],
  providers: [ChatGateway, ChatAppService],
  exports: [MongooseModule],
})
export class ChatModule {}

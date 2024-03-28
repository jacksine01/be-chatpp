import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGateway } from './chat/chat.gateway';
import { ChatAppService } from './chat/chat.service';
import { ChatModule } from './chat/chat.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://jacksine666:tiq1OSo1RcvKgjDr@jacksine01.y8svmtg.mongodb.net/chats',
    ),
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway, ChatAppService],
})
export class AppModule {}
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BookModule } from './book/book.module';
import { SocketModule } from './socket/socket.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SocketService } from './socket/socket.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    AuthModule,
    BookModule,
    SocketModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService, SocketService],
})
export class AppModule {}

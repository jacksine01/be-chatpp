import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IChatLedger } from './entities/chat.entity';
import { Socket } from 'socket.io';

@Injectable()
export class SocketService {
  constructor(
    @InjectModel('UserChat')
    private readonly CHAT_LEDGER: Model<IChatLedger & Document>,
  ) {}
  async saveChat(message: string): Promise<void> {
    const data = await this.CHAT_LEDGER.create({
      message: message,
    });
    console.log({ data });
  }
}

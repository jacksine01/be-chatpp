import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IChatLedger } from './chat.entity';

@Injectable()
export class ChatAppService {
  constructor(
    @InjectModel('chatledger')
    private readonly CHAT_LEDGER: Model<IChatLedger & Document>,
  ) {}

  async saveChat(message: string): Promise<void> {
    const data = await this.CHAT_LEDGER.create({
      message: message,
    });
    console.log({ data });
  }
}
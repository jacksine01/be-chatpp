import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IChatLedger } from './entities/chat.entity';
import { IRandomNumberLedger } from './entities/random-number.entity';

@Injectable()
export class SocketService {
  constructor(
    @InjectModel('UserChat')
    private readonly CHAT_LEDGER: Model<IChatLedger & Document>,
    @InjectModel('RandomNumber')
    private readonly RandomNumber_Ledger: Model<IRandomNumberLedger & Document>,
  ) {}
  async saveChat(message: string): Promise<void> {
    const data = await this.CHAT_LEDGER.create({
      message: message,
    });
    console.log({ data });
  }
  async saveRandomNumber(randomNumber: number): Promise<void> {
    console.log({ randomNumber });
    const data1 = await this.RandomNumber_Ledger.create({
      randomNumber: randomNumber,
    });
    console.log({ data1 });
  }
}
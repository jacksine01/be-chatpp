import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IChatLedger } from './entities/chat.entity';
import { IRandomNumberLedger } from './entities/random-number.entity';
import { CreateBetDto } from './dto/create-bet.dto';

@Injectable()
export class SocketService {
  constructor(
    @InjectModel('UserChat')
    private readonly CHAT_LEDGER: Model<IChatLedger & Document>,
    @InjectModel('RandomNumber')
    private readonly RandomNumber_Ledger: Model<IRandomNumberLedger & Document>,
    @InjectModel('GameControl')
    private readonly BetModel: Model<Document>,
  ) {}
  async saveChat(message: string): Promise<void> {
    const data = await this.CHAT_LEDGER.create({
      message: message,
    });
    console.log({ data });
  }
  async saveRandomNumber(randomNumber: number, hash: String): Promise<void> {
    const data1 = await this.RandomNumber_Ledger.create({
      randomNumber: randomNumber,
      hash: hash,
    });
    // console.log({ data1 });
  }

  async findAll(): Promise<IRandomNumberLedger[]> {
    return await this.RandomNumber_Ledger.find().sort({
      createdAt: -1,
    });
  }

  async create(createBetDto: CreateBetDto): Promise<Document> {
    const newBet = new this.BetModel(createBetDto);
    return newBet.save();
  }
}
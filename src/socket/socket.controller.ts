import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { SocketService } from './socket.service';
import { IRandomNumberLedger } from './entities/random-number.entity';
import { CreateBetDto } from './dto/create-bet.dto';

@Controller('api')
export class SocketController {
  constructor(private readonly socketService: SocketService) {}

  @Get('socket')
  async findAll(): Promise<IRandomNumberLedger[]> {
    try {
      return await this.socketService.findAll();
    } catch (error) {
      console.error('Error fetching data:', error);
      throw new InternalServerErrorException('Failed to fetch data');
    }
  }

  @Post('/addBet')
  async create(@Body() createBetDto: CreateBetDto) {
    console.log(createBetDto);

    return this.socketService.create(createBetDto);
  }
}

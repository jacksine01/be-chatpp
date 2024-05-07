import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBetDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  betAmount: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  payoutNumber: number;
}

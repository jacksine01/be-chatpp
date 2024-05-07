import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IUser } from 'src/auth/schema/user.schema';
export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly description: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly author: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly price: number;

  @IsEmpty({ message: 'You cannot pass user id' })
  readonly user: IUser;
}

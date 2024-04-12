import { IsEmpty, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IUser } from 'src/auth/schema/user.schema';
export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsString()
  readonly author: string;

  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  @IsEmpty({ message: 'You cannot pass user id' })
  readonly user: IUser;
}

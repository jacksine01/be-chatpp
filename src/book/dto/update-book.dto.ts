import { IsEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { IUser } from 'src/auth/schema/user.schema';

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly description: string;

  @IsOptional()
  @IsString()
  readonly author: string;

  @IsOptional()
  @IsNumber()
  readonly price: number;

  @IsEmpty({ message: 'You cannot pass user id' })
  readonly user: IUser;
}

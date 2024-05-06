import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './schema/user.schema';

import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<IUser & Document>,
    private jwtService: JwtService,
  ) {}
  private resetTokens: { [token: string]: string } = {};

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { name, email, password } = signUpDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const token = this.jwtService.sign({
      id: user._id,
      name: name,
      email: email,
    });

    return { token };
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;
    console.log({ email, password });
    const user = await this.userModel.findOne({
      email: email,
    });
    console.log({ user });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    console.log(isPasswordMatched);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({
      id: user._id,
      name: user.name,
      email: user.email,
    });

    return { token };
  }

  generateResetToken(email: string): string {
    const token = uuidv4();
    this.resetTokens[token] = email;
    return token;
  }
  getEmailFromToken(token: string): string {
    const email = this.resetTokens[token];
    if (!email) {
      throw new NotFoundException('Reset token not found');
    }
    return email;
  }

  deleteResetToken(token: string): void {
    delete this.resetTokens[token];
  }

  async updatePassword(email: string, newPassword: string): Promise<void> {
    await this.userModel.findOneAndUpdate(
      { email: email },
      {
        $set: {
          password: newPassword,
        },
      },
    );
  }
}

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { ResetPasswordDto, UpdatePasswordDto } from './dto/reset-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    return this.authService.signUp(signUpDto);
  }

  @Get('/login')
  login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(loginDto);
  }

  @Post('/request')
  requestReset(@Body() resetPasswordDto: ResetPasswordDto) {
    const resetToken = this.authService.generateResetToken(
      resetPasswordDto.email,
    );
    return { message: 'Reset email sent successfully', resetToken };
  }

  @Post('/update')
  updatePassword(@Body() updatePasswordDto: UpdatePasswordDto) {
    const { token, newPassword } = updatePasswordDto;
    const email = this.authService.getEmailFromToken(token);
    this.authService.updatePassword(email, newPassword);
    this.authService.deleteResetToken(token);
    return { message: 'Password updated successfully' };
  }
}

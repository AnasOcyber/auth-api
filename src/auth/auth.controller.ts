import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup';
import { User } from './schemas/user.schema';
import { UpdatePasswordDto } from './dto/update-password';
import { SigninDto } from './dto/login';
import { AuthGuard } from './guards/auth.guard';

@Controller('api')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body() createUserDto: SignupDto): Promise<User> {
    return this.authService.signUp(createUserDto);
  }

  @Get('login')
  signIn(@Body() createUserDto: SignupDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(createUserDto);
  }

  @Get('send-otp')
  sendOtp(@Body() { email }: SigninDto): Promise<{ otp: string }> {
    return this.authService.sendOtp(email);
  }

  @Get('resend-otp')
  resendOtp(@Body() { email }: SigninDto): Promise<{ otp: string }> {
    return this.authService.sendOtp(email);
  }

  @Get('forget-password')
  forgetPassword(@Body() { email }: SigninDto): Promise<{ otp: string }> {
    return this.authService.forgetPassword(email);
  }

  @Patch('reset-password')
  resetPassword(@Body() updatePasswordDto: UpdatePasswordDto): Promise<User> {
    return this.authService.resetPassword(updatePasswordDto);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  getProfile(): string {
    return 'My Profile';
  }
}

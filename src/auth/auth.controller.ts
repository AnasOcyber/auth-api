import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('api')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.createUser(createUserDto);
  }

  @Post('login')
  signIn() {
    return this.authService.getUser();
  }

  @Post('send-otp')
  sendOtp() {
    return this.authService.sendOtp();
  }

  @Post('resend-otp')
  resendOtp() {
    return this.authService.resendOtp();
  }

  @Post('reset-password')
  resetPassword() {
    return this.authService.resetPassword();
  }

  @Post('forget-password')
  forgetPassword() {
    return this.authService.forgetPassword();
  }
}

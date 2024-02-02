import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('api')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.authService.createUser(createUserDto);
  }

  @Get('login')
  signIn(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.authService.signIn(createUserDto);
  }

  @Get('send-otp')
  sendOtp(@Body() { email }: CreateUserDto): Promise<{ otp: string }> {
    return this.authService.sendOtp(email);
  }

  @Get('resend-otp')
  resendOtp(@Body() { email }: CreateUserDto): Promise<{ otp: string }> {
    return this.authService.sendOtp(email);
  }

  @Get('forget-password')
  forgetPassword(
    @Body() { email }: CreateUserDto,
  ): Promise<{ message: string }> {
    return this.authService.forgetPassword(email);
  }

  @Patch('reset-password')
  resetPassword(@Body() updatePasswordDto: UpdatePasswordDto): Promise<User> {
    return this.authService.resetPassword(updatePasswordDto);
  }
}

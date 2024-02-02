import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import mongoose from 'mongoose';

@Injectable()
export class AuthService {
  constructor() {}

  private users = [];

  createUser({ username, password }: CreateUserDto) {
    const User = mongoose.model('User');
    const user = new User({ username: username, password: password });
    this.users.push(user);

    return this.users;
  }

  getUser() {
    return;
  }

  sendOtp() {
    return;
  }

  resendOtp() {
    return;
  }

  resetPassword() {
    return;
  }

  forgetPassword() {
    return;
  }
}

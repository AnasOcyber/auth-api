import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const newOtp = generateOtp();
    const user = new this.userModel({ ...createUserDto, otp: newOtp });
    return await user.save();
  }

  async signIn({ email, password }: CreateUserDto): Promise<User> {
    const user = await this.userModel.findOne({
      email: email,
      password: password,
    });

    if (user) return user;
    throw new NotFoundException();
  }

  async sendOtp(email: string): Promise<{ otp: string }> {
    const user = await this.userModel.findOne({ email: email });

    if (user) return { otp: user.otp };
    throw new NotFoundException();
  }

  async resetPassword({
    email,
    otp,
    newPassword,
  }: UpdatePasswordDto): Promise<User> {
    const user = await this.userModel.findOne({ email: email, otp: otp });
    if (user) {
      user.password = newPassword;
      return user.save();
    }
    throw new NotFoundException();
  }

  async forgetPassword(email: string): Promise<{ message: string }> {
    const user = await this.userModel.findOne({ email: email });
    if (!user) throw new NotFoundException();
    return { message: 'User found' };
  }
}

function generateOtp(): string {
  return (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
}

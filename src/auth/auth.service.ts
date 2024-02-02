import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignupDto } from './dto/signup';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { UpdatePasswordDto } from './dto/update-password';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async signUp({ email, password }: SignupDto): Promise<User> {
    const hashedPassword = await hashPassword(password);

    const user = new this.userModel({
      email,
      password: hashedPassword,
      otp: generateOtp(),
    });

    return await user.save();
  }

  async signIn({ email, password }: SignupDto): Promise<string> {
    const user = await this.userModel.findOne({
      email: email,
    });

    if (!user) throw new NotFoundException();

    const isMatched = await bcrypt.compare(password, user.password.toString());
    if (isMatched) return 'Signin success';

    throw new UnauthorizedException();
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

    if (!user) throw new NotFoundException();

    const hashedPassword = await hashPassword(newPassword);
    user.password = hashedPassword;

    return user.save();
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

async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, await bcrypt.genSalt());
}

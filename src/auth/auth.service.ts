import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignupDto } from './dto/signup';
import { Document, Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { UpdatePasswordDto } from './dto/update-password';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async findUser(email: string): Promise<User> {
    return await this.userModel.findOne({ email: email });
  }

  async signUp({ email, password }: SignupDto): Promise<User> {
    const hashedPassword = await hashPassword(password);

    const existingUser = await this.findUser(email);
    if (existingUser) throw new BadRequestException('User already exists');

    const user = await this.userModel.create({
      email,
      password: hashedPassword,
      otp: generateOtp(),
    });

    return sanitizeUser(user);
  }

  async signIn({
    email,
    password,
  }: SignupDto): Promise<{ accessToken: string }> {
    const user = await this.findUser(email);

    if (!user) throw new NotFoundException();

    const isMatched = await bcrypt.compare(password, user.password.toString());
    if (isMatched) {
      const payload = { email };
      const accessToken = await this.jwtService.signAsync(payload);
      return { accessToken };
    }
    throw new UnauthorizedException();
  }

  async sendOtp(email: string): Promise<{ otp: string }> {
    const user = await this.findUser(email);

    if (user) return { otp: user.otp };

    throw new NotFoundException();
  }

  async resetPassword({
    email,
    otp,
    newPassword,
  }: UpdatePasswordDto): Promise<User> {
    const user = await this.userModel.findOneAndUpdate(
      { email: email, otp: otp },
      { password: await hashPassword(newPassword) },
    );

    if (!user) throw new NotFoundException();

    return sanitizeUser(user);
  }

  async forgetPassword(email: string): Promise<{ otp: string }> {
    const user = await this.findUser(email);

    if (!user) throw new NotFoundException();

    return { otp: user.otp };
  }
}

function generateOtp(): string {
  return (Math.floor(Math.random() * 1000000) + 1000000)
    .toString()
    .substring(1);
}

async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, await bcrypt.genSalt());
}

function sanitizeUser(user: Document): User {
  const sanitizedUser = user.toObject();
  delete sanitizedUser.password;
  return sanitizedUser;
}

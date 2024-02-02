import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayLoad } from './interfaces/payload.interface';
import { AuthService } from './auth.service';
import { User } from './schemas/user.schema';
import { UnauthorizedException } from '@nestjs/common';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      secretOrKey: 'TopSecret51',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate({ email }: JwtPayLoad): Promise<User> {
    const user = await this.authService.findUser(email);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}

import {
  Injectable,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { AuthDto } from './dto/auth.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    try {
      const user = await this.userService.findUserByEmail(dto.email);
      const compare = await bcrypt.compare(dto.password, user.password);

      if (user && compare) {
        const userData = {
          id: user._id,
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          email: user.email,
        };

        const token = this.jwtService.sign(userData);

        return {
          ...userData,
          token,
        };
      }

      throw new UnauthorizedException('incorrect password or email');
    } catch (e) {
      throw new UnauthorizedException('incorrect password or email');
    }
  }

  async isAuth(dto: AuthDto) {
    try {
      const { email } = await this.jwtService.verify(dto.token);

      const user = await this.userService.findUserByEmail(email);

      if (user) {
        const userData = {
          id: user._id,
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          email: user.email,
        };

        return {
          ...userData,
          token: dto.token,
        };
      }

      throw new UnauthorizedException('this user is not authorize');
    } catch (e) {
      throw new UnauthorizedException('this user is not authorize');
    }
  }

  async signUp(dto: SignUpDto) {
    const hasUser = await this.userService.findUserByEmail(dto.email);

    if (hasUser) {
      throw new HttpException(
        {
          message: 'user with this email already exists',
          type: 'email_is_busy',
          code: HttpStatus.CONFLICT,
        },
        HttpStatus.CONFLICT,
      );
    }

    await this.userService.create(dto);
  }
}

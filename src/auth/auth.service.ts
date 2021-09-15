import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async login(dto: LoginDto) {
    try {
      const user = await this.userService.findUserByEmail(dto.email);
      //const compare = await bcrypt.compare(dto.password, user.password);
      const compare = user.password === dto.password;

      if (user && compare) {
        return {
          id: user._id,
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          email: user.email,
          token: 'fake-jwt-token',
        };
      }

      throw new UnauthorizedException('incorrect password or email');
    } catch (e) {
      throw new UnauthorizedException('incorrect password or email');
    }
  }
}

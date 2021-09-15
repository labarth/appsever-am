import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async isAuth(@Body() dto: AuthDto) {
    return this.authService.isAuth(dto);
  }

  @Post('login')
  async create(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}

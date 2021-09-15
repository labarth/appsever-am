import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  getAll() {
    return 'abs';
  }

  @Post('login')
  async create(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}

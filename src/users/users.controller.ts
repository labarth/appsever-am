import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ObjectId } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('api/users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: ObjectId) {
    return this.userService.findOne(id);
  }

  @Post()
  async create(@Body() dto: CreateUserDto) {
    const user = await this.userService.findUserByEmail(dto.email);

    if (user) {
      throw new HttpException(
        'user with this email already exists',
        HttpStatus.CONFLICT,
      );
    }

    return this.userService.create(dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: ObjectId) {
    const deletedUser = await this.userService.delete(id);

    if (deletedUser) {
      return deletedUser;
    }

    return new HttpException('user not found', HttpStatus.NOT_FOUND);
  }

  @Patch(':id')
  update(@Param('id') id: ObjectId, @Body() dto: UpdateUserDto) {
    return this.userService.update(id, dto);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { User } from './schemas/user.schema';
import { UserDocument } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find();

    return users;
  }

  async findOne(id: ObjectId): Promise<User> {
    const user = await this.userModel.findById(id);

    return user;
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email });

    return user;
  }

  async create(dto: CreateUserDto): Promise<User> {
    const user = await this.userModel.create(dto);

    return user;
  }

  async update(id: ObjectId, dto: UpdateUserDto): Promise<User> {
    const user = await this.userModel.findByIdAndUpdate(id, dto, { new: true });

    return user;
  }

  async delete(id): Promise<User> {
    const user = await this.userModel.findByIdAndDelete(id);

    return user;
  }
}

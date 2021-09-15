import { Document } from 'mongoose';
import { User } from '../schemas/user.schema';

export interface UserDocument extends User, Document {
  _id: string;
}

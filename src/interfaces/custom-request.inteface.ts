import { Request } from 'express';
import { User } from '../user/user.entity';

export interface CustomRequest extends Request {
  user: User;
}
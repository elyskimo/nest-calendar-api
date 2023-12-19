import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Logger } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { CustomRequest } from '../interfaces/custom-request.inteface';
const logger = new Logger('AuthMiddleware');


@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  async use(req: CustomRequest, res: Response, next: NextFunction) {
    // console.log('REQUEST',req.headers);
    const token = req.headers.authorization;
    console.log('TOKEN',token);
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    console.log("MIDDLEWARE",token);
    try {
      const user = await this.authService.verifyToken(token);
      if (!user) return res.status(404).json({ message: 'User not found' })
      console.log("YEAH",user);
      req.user = user; // Attach user to the request object
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  }

}
 
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Logger } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
const logger = new Logger('AuthMiddleware');


@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    console.log('REQUEST',req.headers);
    const token = req.headers.authorization;
    console.log('TOKEN',token);
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    console.log("MIDDLEWARE",token);
    try {
      const user = await this.authService.verifyToken(token);
      console.log("YEAH",user);
      // req.user = user; // Attach user to the request object
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  }

  // use(req: Request, res: Response, next: NextFunction) {
  //   // Your middleware logic here 
  //   console.log("LALALA")
  //   logger.log('Auth Middleware');
  //   next(); 
  // }
}
 
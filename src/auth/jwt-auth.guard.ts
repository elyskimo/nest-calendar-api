import {
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { ConfigType } from '@nestjs/config';
  import { Reflector } from '@nestjs/core';
  import { JwtService } from '@nestjs/jwt';
  import { Request } from 'express';
  
  import jwtConfig from './jwt.config';
  import { REQUEST_USER_KEY } from 'src/constats';
  import { ActiveUserData } from 'src/interfaces/active-user-data.interface';
  import { AuthService } from './auth.service';
  
  @Injectable()
  export class JwtAuthGuard implements CanActivate {
    constructor(
      @Inject(jwtConfig.KEY)
      private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
      private readonly jwtService: JwtService,
      private readonly authService: AuthService,
      private reflector: Reflector,
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
        context.getHandler(),
        context.getClass(),
      ]);
      if (isPublic) {
        return true;
      }
  
      const request = context.switchToHttp().getRequest();
      const token = this.getToken(request);
      if (!token) {
        throw new UnauthorizedException('Authorization token is required');
      }
  
      try {
        const payload = await this.jwtService.verifyAsync<ActiveUserData>(
          token,
          this.jwtConfiguration,
        );
  
        const isValidToken = await this.authService.validateRefreshToken(
          `${payload.id}`,
          payload.tokenId,
        );
        if (!isValidToken) {
          throw new UnauthorizedException('Authorization token is not valid');
        }
  
        request[REQUEST_USER_KEY] = payload;
      } catch (error) {
        throw new UnauthorizedException(error.message);
      }
  
      return true;
    }
  
    private getToken(request: Request) {
      const [_, token] = request.headers.authorization?.split(' ') ?? [];
      return token;
    }
  }
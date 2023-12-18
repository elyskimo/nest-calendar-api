import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from 'src/user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BcryptService } from './bcrypt.service';
import { UserService } from 'src/user/user.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import jwtConfig from './jwt.config';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    PassportModule,
    // JwtModule.register({
    //   global: true,
    //   secret: process.env.JWT_SECRET,
    //   signOptions: { expiresIn: '15m'}
    // }),
    ConfigModule,
    JwtModule.registerAsync(jwtConfig.asProvider()),
    // JwtModule.registerAsync({
    //   useFactory: jwtConfig,
    // }),
    TypeOrmModule.forFeature([User]), 
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, BcryptService, JwtStrategy],
  exports: [ JwtModule, AuthService ]
})
export class AuthModule {}

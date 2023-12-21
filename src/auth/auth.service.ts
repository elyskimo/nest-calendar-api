import { ConflictException, BadRequestException } from '@nestjs/common';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { BcryptService } from './bcrypt.service';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private userService: UserService,
    private bcryptService: BcryptService,
    private jwtService: JwtService
) {}


  async register(createUserDto: CreateUserDto): Promise<any> {

    const { email, firstname, lastname, password } = createUserDto;

    try {
        const user = new User();
        user.email = email;
        user.firstname = firstname;
        user.lastname = lastname;
        user.password = await this.bcryptService.hash(password);
        user.createdAt = new Date().toString()
        user.refreshToken = '';

        await this.userRepository.save(user);
    } catch(error) {
        if (error.code === 'ER_DUP_ENTRY') {
            throw new ConflictException(`User [${email}] already exist`);
        }
        throw error;
    }
    
  }

  async login(email: string, password: string): Promise<any> {

    const user: User | null = await this.validateUser(email, password);

    if (!user) {
        throw new UnauthorizedException('Invalid credentials');
    }

    return await this.updateTokens(user);
  }

  async logout(userId: number): Promise<void> {
    await this.userRepository.update(userId, { refreshToken: null });
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
        throw new BadRequestException('Invalid emai or password');
    }

    const isPasswordMatch = await this.bcryptService.compare(password,user.password);

    if (!isPasswordMatch) {
        throw new BadRequestException('Invalid email or password');
    }
    return user;
  }

  async updateTokens(user: User): Promise<{accessToken: string, refreshToken: string, userId: number}> {
    const accessToken = await this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken();
    console.log('refresh token old',user.refreshToken,' new - ',refreshToken);
    user.refreshToken = refreshToken;
    await this.userRepository.update(user.id, { refreshToken });
    return {
      accessToken,
      refreshToken,
      userId: user.id
    };
  }

  async validateRefreshToken(userId: string, refreshToken: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({id: Number(userId)});

    return user && user.refreshToken === refreshToken ? user : null ;
  }

  async generateAccessToken(user: User): Promise<string> {
    const payload = { email: user.email, sub: user.id };
    return this.jwtService.sign(payload);
  }

  async generateRefreshToken(): Promise<string> {
    const token = crypto.randomBytes(48).toString('hex');
    return token;
  }

  async verifyToken(token: string): Promise<User> {
    console.log("verifyToken");
    try {
      const sanitizedToken = token.replace('Bearer ', '');
      const { email, sub, iat } = this.jwtService.verify(sanitizedToken);

      const user = await this.userRepository.findOneBy({ id: parseInt(sub) });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      return user;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
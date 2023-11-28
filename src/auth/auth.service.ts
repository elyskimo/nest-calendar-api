import { ConflictException } from '@nestjs/common';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { BcryptService } from './bcrypt.service';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/user/dto/create-user.dto';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private userService: UserService,
    private bcryptService: BcryptService
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

        await this.userRepository.save(user);
    } catch(error) {
        if (error.code === 'ER_DUP_ENTRY') {
            throw new ConflictException(`User [${email}] already exist`);
          }
          throw error;
    }
    
  }

  async login(loginUserDto: LoginUserDto): Promise<any> {

  }
}
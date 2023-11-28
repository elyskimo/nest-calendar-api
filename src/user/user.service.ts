import { Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserParams } from 'src/utils/types';

@Injectable()
export class UserService {
    // public users: UserDto[] = [];
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>
    ) {}

    create(user: CreateUserParams) {
        // const newUser = this.userRepository.create({
        //     ...user, 
        //     createdAt: new Date().toString()
        // });
        let newUser = new User();
        newUser.email = user.email;
        newUser.firstname = user.firstname;
        newUser.lastname = user.lastname;


        // Set the password using the setPassword method
        // const { salt, password} = newUser.setPassword(user.password);

        // newUser.salt = salt;
        newUser.password = 'password';

        
        this.userRepository.save(newUser);
        return newUser;
    }

    findAll() {
        return this.userRepository.find();
    }

    async findOne(email: string): Promise<User | undefined> {
        return this.userRepository.findOne({ where: { email } });
    }
}

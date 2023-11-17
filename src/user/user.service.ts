import { Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';

@Injectable()
export class UserService {
    public users: UserDto[] = [];

    create(user: UserDto): UserDto {
        this.users.push(user);
        return user;
    }

    findAll(): UserDto[] {
        return this.users;
    }
}

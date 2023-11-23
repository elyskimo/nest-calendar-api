import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @Post('/')
    create(@Body() user: UserDto): UserDto {
        // const { ...user, confirmPassword} = user;
        return this.userService.create(user);
    }
    
    @Get()
    async findAll(): Promise<UserDto[]> {
        const users = await this.userService.findAll();
        return users;
    }
}

import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @Post('/')
    create(@Body() user: UserDto): UserDto {
        
        return this.userService.create(user);
    }
    
    @Get()
    findAll(): UserDto[] {
        return this.userService.findAll();
    }
}

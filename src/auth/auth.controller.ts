import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Post, Body } from '@nestjs/common';
import { UserDto } from 'src/user/user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    // @Public()
    @Post('register')
    register(@Body() signUpDto: UserDto): Promise<void> {
        return this.authService.register(signUpDto);
    }
}

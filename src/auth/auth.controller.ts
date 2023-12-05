import { Controller, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Post, Body } from '@nestjs/common';
import { UserDto } from 'src/user/user.dto';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import * as cookie from 'cookie';
import { Public } from 'src/decorators/public.decorator';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post('register')
    register(@Body() signUpDto: UserDto): Promise<void> {
        return this.authService.register(signUpDto);
    }

    @Public()
    @Post('login')
    async login(@Req() req: Request, @Res({ passthrough: false }) res: Response): Promise<any> {

        const response = await this.authService.login(req.body.email, req.body.password);

        if(!Object.keys(response).length) return 'Error generation tokens'

        res.setHeader('Set-Cookie', cookie.serialize('authentication', JSON.stringify(response), { httpOnly: true }));
      
        console.log("cookie",response);

        // Return the access token  
        return res.status(200).json({ message: 'User authenticated'});
    }

    @Post('refresh-token')
    async refreshToken(@Req() req: Request, @Res() res: Response): Promise<any> {
        console.log('ici',req.cookies, req.headers);
        
        const { refreshToken, userId } = req.cookies;
        console.log('refresh',refreshToken);
        console.log('userId',userId);

        // Validate the refresh token
        const user = await this.authService.validateRefreshToken(userId,refreshToken);

        if (user) {
            // Refresh the access token and the refresh token
            const response = await this.authService.updateTokens(user);

            // Send the new access token to the client
            res.setHeader('Set-Cookie', cookie.serialize('authentication', JSON.stringify(response), { httpOnly: true }));
            return res.status(200).json({ message: 'Authentication refreshed' });
        } else {
        // Handle invalid refresh token
        return res.status(401).json({ message: 'Invalid refresh token' })    ;

        }

    }

    @Post('logout')
    async logout() {}
}

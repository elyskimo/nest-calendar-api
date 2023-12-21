import { IsEmail, IsNumber, IsNotEmpty, IsOptional } from "class-validator";

export class LoginUserDto {

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}

import { IsString, IsNumber, IsOptional, IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    // @IsOptional()
    // @IsNumber()
    // id?: number;
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    firstname: string;

    @IsString()
    lastname: string;

    @IsNotEmpty()
    password: string;
}

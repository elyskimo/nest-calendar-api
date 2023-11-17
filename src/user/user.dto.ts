import { IsString, IsNumber } from "class-validator";

export class UserDto {
    @IsNumber()
    id: number;

    @IsString()
    email: string;

    @IsString()
    firstname: string;

    @IsString()
    lastname: string;
}

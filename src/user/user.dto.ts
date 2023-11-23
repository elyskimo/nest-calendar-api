import { IsString, IsNumber, IsOptional } from "class-validator";

export class UserDto {
    // @IsOptional()
    // @IsNumber()
    // id?: number;

    // @IsString()
    email: string;

    // @IsString()
    firstname: string;

    // @IsString()
    lastname: string;
}

/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty} from "class-validator";

export class RegisterUserDto{

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    user_name: string
}
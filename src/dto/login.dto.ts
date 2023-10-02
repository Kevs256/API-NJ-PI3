/* eslint-disable prettier/prettier */

import { IsString, IsOptional} from "class-validator";

export class LoginUserDto{
    @IsString()
    @IsOptional()
    email: string;

    @IsString()
    @IsOptional()
    password: string;

    @IsString()
    @IsOptional()
    tokenFingerPrint?: string;
}
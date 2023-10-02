/* eslint-disable prettier/prettier */

import { IsString, IsOptional, IsNotEmpty} from "class-validator";

export class EditProfileDto{
    @IsString()
    @IsNotEmpty()
    user_name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    imgProfile?: string;
}
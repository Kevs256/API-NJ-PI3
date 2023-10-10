/* eslint-disable prettier/prettier */

import { IsString, IsOptional, IsNotEmpty, IsNumber} from "class-validator";

export class InfoProfileDto{
    @IsString()
    @IsNotEmpty()
    user_id: string;

    @IsString()
    @IsNotEmpty()
    user_name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    imgProfile?: string;

    @IsNumber()
    @IsNotEmpty()
    intSeguidores: number;

    @IsNumber()
    @IsNotEmpty()
    intSeguidos: number;

    @IsNumber()
    @IsNotEmpty()
    NumberRoutes: number;
}
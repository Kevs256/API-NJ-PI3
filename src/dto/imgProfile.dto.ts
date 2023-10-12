/* eslint-disable prettier/prettier */

import { IsString } from "class-validator";
export class imageProfileDto{
    @IsString()
    filename: string;
}
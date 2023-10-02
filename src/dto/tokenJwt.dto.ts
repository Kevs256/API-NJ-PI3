/* eslint-disable prettier/prettier */

import { IsString, IsNotEmpty} from "class-validator";

export class TokenJWTDto{
    @IsString()
    @IsNotEmpty()
    tokenJWT: string;
}
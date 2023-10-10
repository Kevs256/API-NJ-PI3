/* eslint-disable prettier/prettier */

import { IsString, IsNotEmpty} from "class-validator";

export class FollowDto{
    @IsString()
    @IsNotEmpty()
    user_id: string;

    @IsString()
    @IsNotEmpty()
    user_id_following: string;
}
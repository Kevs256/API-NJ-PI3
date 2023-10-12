import { IsString, IsOptional, IsNotEmpty, IsNumber} from "class-validator";
export class InfoProfileTileDto{
    @IsString()
    @IsNotEmpty()
    user_id: string;

    @IsString()
    @IsNotEmpty()
    user_name: string;

    @IsString()
    @IsOptional()
    imgProfile?: string;
}
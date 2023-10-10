/* eslint-disable prettier/prettier */
import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('images')
export class ImagesController {
    @Post('/imgProf')
    @UseInterceptors(FileInterceptor('imgProf',{
        storage: diskStorage({
            destination:'./uploads'
        })
    }))
    uploadImageEditProfile(@UploadedFile() file: Express.Multer.File, @Body() user_id: string) {
        console.log(file, user_id);
    }
}

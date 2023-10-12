/* eslint-disable prettier/prettier */
import { Controller, Get, Header, HttpException, HttpStatus, Param, Post, StreamableFile, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { destinationImageProfile, fileFilter, nameImageProfile } from './helpers/images.helper';
import { diskStorage } from 'multer';
import { ImagesService } from 'src/images/images.service';
import { AuthService } from 'src/auth/auth.service';
import { createReadStream } from 'fs';

@Controller('images')
export class ImagesController {

    constructor(private imagesService: ImagesService, private authService: AuthService) { }

    @Post('/imgProf')
    @UseInterceptors(FileInterceptor('imgProf', {
        storage: diskStorage({
            destination: destinationImageProfile,
            filename: nameImageProfile
        }),
        fileFilter: fileFilter
    }))
    async uploadImageEditProfile(@UploadedFile() file: Express.Multer.File) {
        console.log(file.path);
        const user_id = file.originalname.split('_')[1].split('.')[0]
        console.log(file.originalname.split('_')[1].split('.')[0]);
        try {
            const User = await this.imagesService.editImageProfileService(file.path, user_id)
            if (!User) {
                throw new HttpException('No encontrado', HttpStatus.NOT_FOUND);
            }
            return { statusCode: 200, message: "foto editada con exito" };
        } catch (error) {
            if (error.status === HttpStatus.NOT_FOUND) {
                throw new HttpException('No encontrado', HttpStatus.NOT_FOUND);
            }
            throw new HttpException('Error interno del servidor', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //send image by id
    @Get('/imgProf/:id')
    @Header('Content-Type', 'image/jpeg')
    @Header('Content-Disposition', 'attachment; filename="user_image.jpg"')
    async getImageProfile(@Param('id') user_id: string){
        try {
            const User = await this.authService.findOne(user_id)
            if (!User) {
                throw new HttpException('No encontrado', HttpStatus.NOT_FOUND);
            }
            const imagePath = User.imgProfile
            console.log(imagePath);
            if(!imagePath){
                throw new HttpException('No tiene una imagen de perfil', HttpStatus.NOT_FOUND);
            }
            const fileStream = createReadStream(imagePath);
            return new StreamableFile(fileStream);
        }catch (error) {
            if (error.status === HttpStatus.NOT_FOUND) {
                throw new HttpException('No encontrado', HttpStatus.NOT_FOUND);
            }
            throw new HttpException('Error interno del servidor', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

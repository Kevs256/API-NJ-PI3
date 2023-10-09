/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Post, Put } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { EditProfileDto } from 'src/dto/editProfile.dto';

@Controller('profile')
export class ProfileController {
    constructor(private profileService : ProfileService){}

    @Get('/test1')
    test1() {
        return this.profileService.test();
    }

    @Put('/edit')
    async editProfileService(@Body() body: EditProfileDto) {
        try {
            const User = await this.profileService.editProfileService(body);
            console.log(User)
            //if (!User) {
            //    throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED)
            //}
            //const token = await this.authService.generateJwt(User.user_id)
            //return { token }
            return "update2"
        }
        catch (error) {
            console.log(error.message)
            throw new HttpException('Error interno del servidor', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return "no update"
    }

    @Get('/test2')
    async test2() {
        return this.profileService.test();
    }
}

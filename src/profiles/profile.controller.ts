/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { EditProfileDto } from 'src/dto/editProfile.dto';
import { InfoProfileDto } from 'src/dto/infoProfile.dto';
import { User } from 'src/schemas/user.schema';
import { FollowDto } from 'src/dto/follow.dto';
import { AuthService } from '../auth/auth.service';

@Controller('profile')
export class ProfileController {
    constructor(private profileService: ProfileService, private authService: AuthService) { }

    @Put('/edit')
    async editProfileService(@Body() body: EditProfileDto) {
        try {
            const User = await this.profileService.editProfileService(body);
            if (!User) {
                throw new HttpException('No encontrado', HttpStatus.NOT_FOUND);
            }
            return User
        }
        catch (error) {
            if (error.status === HttpStatus.NOT_FOUND) {
                throw new HttpException('No encontrado', HttpStatus.NOT_FOUND);
            }
            throw new HttpException('Error interno del servidor', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('/:id')
    async getProfileService(@Param('id') user_id: string) {
        try {
            const User: User = await this.profileService.getProfileService(user_id);
            if (!User) {
                throw new HttpException('No encontrado', HttpStatus.NOT_FOUND);
            }

            const infoProfileDto = new InfoProfileDto();
            infoProfileDto.user_id = User.user_id;
            infoProfileDto.user_name = User.user_name;
            infoProfileDto.description = User.description;
            infoProfileDto.imgProfile = User.imgProfile;
            infoProfileDto.intSeguidores = User.intSeguidores;
            infoProfileDto.intSeguidos = User.intSeguidos;
            infoProfileDto.NumberRoutes = User.NumberRoutes;

            return {infoProfileDto, isFollowing:"true"}
        } catch (error) {
            if (error.status === HttpStatus.NOT_FOUND) {
                throw new HttpException('No encontrado', HttpStatus.NOT_FOUND);
            }
            throw new HttpException('Error interno del servidor', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('/follow')
    async followProfileService(@Body() body: FollowDto) {

        try {
            const UserFollowing = await this.profileService.findOneFollowing(body.user_id);
            const UserFollower = await this.profileService.findOneFollower(body.user_id_following);

            const UserExistFollowing = await this.authService.findOne(body.user_id)
            const UserExistFollower = await this.authService.findOne(body.user_id_following)

            console.log(UserExistFollowing)
            console.log(UserExistFollower)

            if (UserExistFollowing == null) {
                return new HttpException('Este usuario no existe', HttpStatus.BAD_REQUEST);
            } else {
                if (!UserFollowing) {
                    await this.profileService.createUserFollowing(body.user_id);
                }
            }

            if (UserExistFollower == null) {
                return new HttpException('Este usuario no existe', HttpStatus.BAD_REQUEST);
            } else {
                if (!UserFollower) {
                    await this.profileService.createUserFollowers(body.user_id_following);
                }
            }

            const UserVerifiFollowing = await this.profileService.findOneFollowingUsers(body);
            const UserVerifiFollower = await this.profileService.findOneFollowerUsers(body);

            if (!UserVerifiFollowing && !UserVerifiFollower) {
                await this.profileService.updateFollowing(body)
                await this.profileService.updateFollower(body)
                return new HttpException('Solicitud exitosa', HttpStatus.OK);
            } else {
                return new HttpException('Ya sigues a este usuario', HttpStatus.BAD_REQUEST);
            }

        } catch (error) {
            if (error.status === HttpStatus.NOT_FOUND) {
                throw new HttpException('No encontrado', HttpStatus.NOT_FOUND);
            }
            throw new HttpException('Error interno del servidor', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('/following')
    async isFollowing(@Body() body: FollowDto) {
        const UserVerifiFollowing = await this.profileService.findOneFollowingUsers(body);
        const UserVerifiFollower = await this.profileService.findOneFollowerUsers(body);
        if (!UserVerifiFollowing && !UserVerifiFollower) {
            return {isFollowing:"false"}
        }else{
            return {isFollowing:"true"}
        }
    }
}
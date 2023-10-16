/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { EditProfileDto } from 'src/dto/editProfile.dto';
import { InfoProfileDto } from 'src/dto/infoProfile.dto';
import { User } from 'src/schemas/user.schema';
import { FollowDto } from 'src/dto/follow.dto';
import { AuthService } from '../auth/auth.service';
import { InfoProfileTileDto } from 'src/dto/infoProfileTile.dto';

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

            return { infoProfileDto, isFollowing: "true" }
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
            return { isFollowing: "false" }
        } else {
            return { isFollowing: "true" }
        }
    }

    //metodo de contar cuantos seguidores tiene un usuario
    @Get('/follows/:id')
    async countFollowers(@Param('id') user_id: string) {
        const user1 = await this.profileService.findOneFollowing(user_id);
        const user2 = await this.profileService.findOneFollower(user_id);

        let followers = 0;
        let following = 0;
        try {
            if (!user1 && !user2) {
                return new HttpException('No encontrado', HttpStatus.NOT_FOUND);
            } else {
                if (user1 && user1.following_id.length) {
                    following = user1.following_id.length
                } else {
                    following = 0
                }

                if (user2 && user2.follower_id.length) {
                    followers = user2.follower_id.length
                } else {
                    followers = 0
                }
                return { followers, following, statusCode: 200 }
            }
        } catch (error) {
            if (error.status === HttpStatus.NOT_FOUND) {
                throw new HttpException('No encontrado', HttpStatus.NOT_FOUND);
            }
            throw new HttpException('Error interno del servidor', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //search profile name
    @Get('/search/:name')
    async searchProfile(@Param('name') name: string) {
        try {
            const allProfiles: User[] = await this.profileService.searchProfiles();

            const infoProfiles: InfoProfileTileDto[] = allProfiles.map((profile) => {
                const infoProfile = new InfoProfileTileDto();
                infoProfile.user_id = profile.user_id;
                infoProfile.user_name = profile.user_name;
                infoProfile.imgProfile = profile.imgProfile; // Si imgProfile no existe, esto será undefined en el DTO

                return infoProfile;
            });

            const arrayNameProfiles = infoProfiles.map((profile) => profile.user_name);

            const coincidencias = await this.profileService.namesCoincidences(name, arrayNameProfiles)

            const perfilesFiltrados = infoProfiles.filter((perfil) =>
                coincidencias.some((nombreObjetivo) => nombreObjetivo.target === perfil.user_name)
            );

            if (perfilesFiltrados.length == 0) {
                throw new HttpException('No hubo coincidencias', HttpStatus.NOT_FOUND);
            }

            return { perfilesFiltrados, statusCode: 200 }

        } catch (error) {
            if (error.status === HttpStatus.NOT_FOUND) {
                throw new HttpException('No hubo coincidencias', HttpStatus.NOT_FOUND);
            }
            throw new HttpException('Error interno del servidor', HttpStatus.INTERNAL_SERVER_ERROR);
        }


    }

}
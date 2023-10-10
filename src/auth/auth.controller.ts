/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, ConflictException, HttpException, HttpStatus, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from 'src/dto/register.dto';
import { LoginUserDto } from 'src/dto/login.dto';
import { User } from 'src/schemas/user.schema';
import { TokenJWTDto } from 'src/dto/tokenJwt.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    //ingresar con huella, auth

    //registrar
    @Post('/register')
    async Register(@Body() body: RegisterUserDto) {
        try {
            const user = await this.authService.createUser(body)
            const token = await this.authService.generateJwt(user.user_id)
            return {tokenJWT:token , statusCode:200}
        } catch (error) {
            if (error.code == 11000) {
                throw new ConflictException("User already exists")
            }
            throw error;
        }
    }

    //login
    @Post('/login')
    async Login(@Body() body: LoginUserDto) {
        try {
            const User: User = await this.authService.loginUser(body)
            console.log(User)
            if (!User) {
                throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED)
            }
            const token = await this.authService.generateJwt(User.user_id)
            return {tokenJWT:token , statusCode:200}
            //mandar por cookie
        }
        catch (error) {
            if (error.status === HttpStatus.UNAUTHORIZED) {
                throw new HttpException('No autorizado', HttpStatus.UNAUTHORIZED);
            }
            throw new HttpException('Error interno del servidor', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //auth toekn, vacio, o claim
    @Post('/auth')
    async Auth(@Body() body: TokenJWTDto) {
        try {
            const respuesta = await this.authService.verifyJwt(body.tokenJWT)
            return {respuesta, statusCode:200}
        } catch (error) {
            if (error == "JsonWebTokenError: invalid signature") {
                throw new UnauthorizedException("JWT Unauthorized")
            }
            throw new HttpException('Error interno del servidor', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //byi
    @Get('/findUser/:id')
    async findUserById(@Param('id') id: string) {
        try {
            const user = await this.authService.findOne(id);
            console.log(user)
            if (!user) {
                throw new NotFoundException('User not found');
            }
            return {user, statusCode:200};
        } catch (error) {
            throw error;
        }
    }

    //pendiente servicio de recuperar contraseña de correo electronico

}
/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, ConflictException, HttpException, HttpStatus, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from 'src/dto/register.dto';
import { LoginUserDto } from 'src/dto/login.dto';
import { User } from 'src/schemas/user.schema';
import { TokenJWTDto } from 'src/dto/tokenJwt.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    //ingresar con huella, auth

    //test
    @Get(':id')
    test(@Param('id') id: string, @Body() body: string) {
        console.log(id + body)
        return this.authService.findAll()
    }

    @Delete()
    test3() {
        console.log("si entro")
        return "delete"
    }

    @Put()
    test4() {
        return "update"
    }

    //registrar
    @Post('/register')
    async Register(@Body() body: RegisterUserDto) {
        try {
            return await this.authService.createUser(body)
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
            if (!User) {
                throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED)
            }
            const token = await this.authService.generateJwt(User.user_id)
            return { token }
        }
        catch (error) {
            throw new HttpException('Error interno del servidor', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //auth toekn, vacio, o claim
    @Post('/auth')
    async Auth(@Body() body: TokenJWTDto) {
        try {
            const respuesta = await this.authService.verifyJwt(body.tokenJWT)
            return respuesta
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
            console.log(id)
            const user = await this.authService.findOne(id);
            console.log(user)
            if (!user) {
                throw new NotFoundException('User not found');
            }
            return user;
        } catch (error) {
            throw error;
        }
    }

    //pendiente servicio de recuperar contraseña de correo electronico

}
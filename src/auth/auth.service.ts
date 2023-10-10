/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from 'src/dto/register.dto';
import { LoginUserDto } from 'src/dto/login.dto';

const secretKey = 'elefante16';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<User>,
        private jwtService: JwtService
    ) { }

    findAll() {
        return this.userModel.find()
    }

    findOne(user_id: string) {
        return this.userModel.findOne({ user_id: user_id });
    }

    findOneByEmail(email: string) {
        return this.userModel.findOne({ email: email });
    }

    findOneByTokenFingerPrint(tokenFingerPrint: string) {
        return this.userModel.findOne({ tokenFingerPrint: tokenFingerPrint });
    }

    createUser(registerUserDto: RegisterUserDto) {
        const newUser = new this.userModel(registerUserDto);
        return newUser.save();
    };

    generateJwt(id_user: string) {
        const payload = {
            id_user: id_user,
        };
        const token = this.jwtService.sign(payload, { secret: secretKey });
        return token;
    }

    verifyJwt(token: string) {
        return this.jwtService.verifyAsync(token, { secret: secretKey });
    }

    verifyRecoveriCode(recoveriCode: string) {
        return this.userModel.findOne({ recoveriCode: recoveriCode });
    }

    loginUser(loginUserDto: LoginUserDto) {
        if (loginUserDto.tokenFingerPrint != undefined) {
            return this.userModel.findOne({ tokenFingerPrint: loginUserDto.tokenFingerPrint });
        }
        return this.userModel.findOne({ email: loginUserDto.email, password: loginUserDto.password });
    }

    generateRecoveriCode() {
        let recoveriCode = 0;
        for (let i = 0; i < 4; i++) {
            recoveriCode += Math.floor(Math.random() * 10);
            return recoveriCode;
        }
    }

    saveRecoveriCode(id_user: string, recoveriCode: number) {
        return this.userModel.findOneAndUpdate({ id_user: id_user }, { recoveriCode: recoveriCode });
    }

    //servicio de enviar correo electronico
    //servicio de ingreso con huella

}
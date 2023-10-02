/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [JwtModule.register({ secret: 'elefanteOjon' }),
  MongooseModule.forFeature([
    {
      name: User.name,
      schema: UserSchema
    }
  ])
  ]
})
export class AuthModule { }

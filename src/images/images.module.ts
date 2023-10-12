/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { AuthService } from 'src/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [ImagesController],
  providers: [ImagesService, AuthService],
  imports: [JwtModule.register({ secret: 'elefanteOjon' }), 
  MongooseModule.forFeature([
    {
      name: User.name,
      schema: UserSchema
    },
  ])],
})
export class ImagesModule { }

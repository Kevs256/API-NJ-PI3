/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileModule } from './profiles/profile.module';
import { ImagesModule } from './images/images.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.1.1:27017/profileDB'),
    AuthModule, ProfileModule, ImagesModule
  ],
})
export class AppModule {}

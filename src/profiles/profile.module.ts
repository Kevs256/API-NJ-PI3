/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService],
  imports: [
  MongooseModule.forFeature([
    {
      name: User.name,
      schema: UserSchema
    }
  ])
  ]
})
export class ProfileModule { }

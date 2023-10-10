/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { Following, FollowingSchema } from 'src/schemas/following.schema';
import { Followers, FollowersSchema } from 'src/schemas/followers.schema';
import { AuthService } from 'src/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService, AuthService],
  imports: [JwtModule.register({ secret: 'elefanteOjon' }),
  MongooseModule.forFeature([
    {
      name: User.name,
      schema: UserSchema
    },{
      name: Following.name,
      schema: FollowingSchema
    },
    {
      name: Followers.name,
      schema: FollowersSchema
    }
  ])
  ]
})
export class ProfileModule { }

/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { EditProfileDto } from 'src/dto/editProfile.dto';
import { Following } from 'src/schemas/following.schema';
import { Followers } from 'src/schemas/followers.schema';
import { FollowDto } from 'src/dto/follow.dto';
import { InfoProfileDto } from 'src/dto/infoProfile.dto';
var stringSimilarity = require("string-similarity");

@Injectable()
export class ProfileService {
    constructor(
    @InjectModel(User.name) private userModel: Model<User>, 
    @InjectModel(Following.name) private followingModel : Model<Following>, 
    @InjectModel(Followers.name) private followerModel : Model<Followers>,
    ) { }

    updateUser(id_user: string, user: User): Promise<User> {
        return this.userModel.findOneAndUpdate({ id_user: id_user }, user);
    }

    //metodo de editar perfil por id
    editProfileService(useEdit: EditProfileDto) {
        return this.userModel.findOneAndUpdate({ user_id: useEdit.user_id }, { description: useEdit.description, user_name: useEdit.user_name, imgProfile: useEdit.imgProfile }, { new: true });
    }

    //metodo de tomar datos del perfil por id
    getProfileService(user_id: string) {
        return this.userModel.findOne({ user_id: user_id });
    }

    //metodo actualizar perfil por id
    updateProfileService(user_id: string, user: User) {
        return this.userModel.findOneAndUpdate({ user_id: user_id }, user);
    }

    findOneFollowing(user_id: string) {
        return this.followingModel.findOne({ user_id: user_id });
    }

    findOneFollower(user_id: string) {
        return this.followerModel.findOne({ user_id: user_id });
    }

    createUserFollowing(user_id: string) {
        const newUser = new this.followingModel({user_id:user_id});
        return newUser.save();
    };

    createUserFollowers(user_id: string) {
        const newUser = new this.followerModel({user_id:user_id});
        return newUser.save();
    };
    
    updateFollowing(follow : FollowDto){
        return this.followingModel.findOneAndUpdate({ user_id: follow.user_id }, { $push: { following_id: follow.user_id_following } }, { new: true });
    }

    updateFollower(follow : FollowDto){
        return this.followerModel.findOneAndUpdate({ user_id: follow.user_id_following }, { $push: { follower_id: follow.user_id } }, { new: true });
    }

    //already exist follow
    findOneFollowingUsers(follow : FollowDto){
        return this.followingModel.findOne({ user_id: follow.user_id, following_id: follow.user_id_following });
    }

    findOneFollowerUsers(follow : FollowDto){
        return this.followerModel.findOne({ user_id: follow.user_id_following, following_id: follow.user_id});
    }

    searchProfiles() {
        return this.userModel.find();
    }

    namesCoincidences(name:string, arrayProfiles : string[]){
        var matches = stringSimilarity.findBestMatch(name, arrayProfiles);
        return matches.ratings.filter(match => match.rating > 0.5);
    }
}


/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class ImagesService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
    ) { }

    editImageProfileService(imagePath: string, user_id: string) {
        return this.userModel.findOneAndUpdate({ user_id: user_id }, { imgProfile: imagePath }, { new: true });
    }

}



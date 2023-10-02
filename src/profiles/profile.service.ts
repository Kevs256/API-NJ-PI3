/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProfileService {
    constructor(@InjectModel(User.name) private userModel: Model<User>,
    ) { }

    updateUser(id_user: string, user: User): Promise<User> {
        return this.userModel.findOneAndUpdate({ id_user: id_user }, user);
    }
    
}
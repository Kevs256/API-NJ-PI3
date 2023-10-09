/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { EditProfileDto } from 'src/dto/editProfile.dto';

@Injectable()
export class ProfileService {
    constructor(@InjectModel(User.name) private userModel: Model<User>,
    ) { }

    updateUser(id_user: string, user: User): Promise<User> {
        return this.userModel.findOneAndUpdate({ id_user: id_user }, user);
    }

    //test('should first', () => { second })
    test() {
        return "hola"
    }

    //metodo de editar perfil por id
    editProfileService(useEdit: EditProfileDto) {
        try {
            return this.userModel.findOneAndUpdate({ id_user: useEdit.user_id }, {description: useEdit.description, user_name: useEdit.user_name, imgProfile: useEdit.imgProfile }, {new:true});
        } catch (error) {
            console.log(error)
        }
    }
    
}
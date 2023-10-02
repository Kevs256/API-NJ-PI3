/* eslint-disable prettier/prettier */
import { Controller, Delete, Put } from '@nestjs/common';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
    constructor(private profileService : ProfileService){}

    @Delete()
    test3() {
        return "delete"
    }

    @Put()
    test4() {
        return "update"
    }
}

/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';

@Schema({
    timestamps: true
})
export class User {

    @Prop({
        type: String, default: function genUUID() {
            return uuidv4()
        }
    })
    user_id: string

    @Prop({ default: 0 })
    user_type: number;

    @Prop({ default: 0 })
    user_status: number;

    @Prop()
    user_name: string;

    @Prop({
        unique: true
    })
    email: string;

    @Prop()
    password: string;

    @Prop({ default: 0 })
    intSeguidores: number;

    @Prop({ default: 0 })
    intSeguidos: number;

    @Prop()
    description: string;

    @Prop()
    imgProfile: string;

    @Prop()
    tokenFingerPrint: string;

    @Prop()
    recoveriCode: string;

    @Prop({ default: 0 })
    NumberRoutes: number;

}

export const UserSchema = SchemaFactory.createForClass(User);

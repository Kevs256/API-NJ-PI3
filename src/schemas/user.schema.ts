/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';

@Schema({
    timestamps: true
})
export class User {

    @Prop({ type: String, default: function genUUID() {
        return uuidv4()
    }})
    user_id: string

    @Prop()
    user_type: number;

    @Prop()
    user_status: number;

    @Prop()
    user_name: string;

    @Prop({
        unique: true
    })
    email: string;

    @Prop()
    password: string;

    @Prop()
    intSeguidores: number;

    @Prop()
    intSeguidos: number;

    @Prop()
    description: string;

    @Prop()
    imgProfile: string;

    @Prop()
    tokenFingerPrint: string;

    @Prop()
    recoveriCode: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

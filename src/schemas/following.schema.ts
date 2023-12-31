/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
    timestamps: true
})
export class Following {
    @Prop()
    user_id: string; // Supongo que estos son identificadores únicos para usuarios
    @Prop({type:[String], unique:true})
    following_id: string[]
}

export const FollowingSchema = SchemaFactory.createForClass(Following);


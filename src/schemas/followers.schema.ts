/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
    timestamps: true
})
export class Followers {
    @Prop()
    user_id: string; // Supongo que estos son identificadores únicos para usuarios
    @Prop([String])
    follower_id: string[]
}

export const FollowersSchema = SchemaFactory.createForClass(Followers);
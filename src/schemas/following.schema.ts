/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
    timestamps: true
})
export class Following {
    @Prop()
    id_user: string; // Supongo que estos son identificadores únicos para usuarios
    @Prop([String])
    id_follower: string[]
}

export const SaveRoutesSchema = SchemaFactory.createForClass(Following);


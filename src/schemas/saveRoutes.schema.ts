/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
    timestamps: true
})
export class SaveRoutes {
    @Prop()
    id_user: string; 
    @Prop([String])
    id_routes: string[];
}

export const FollowingSchema = SchemaFactory.createForClass(SaveRoutes);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
        @Prop() 
        public name:string
        @Prop() 
        public email:string 
        @Prop() 
        public username:string
        @Prop()
        public password:string
}

export const UserSchema = SchemaFactory.createForClass(User);

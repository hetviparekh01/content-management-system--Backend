import mongoose, { Schema } from "mongoose";
import { IUser } from "../interfaces/IUser";

const UserSchema=new Schema<IUser>({
    name:{type:String,required:[true,'name is required']},
    email:{type:String,required:[true,'email is required'],unique:true},
    password:{type:String,required:[true,'password is required']},
    role:{type:String,required:[true,'role is required'],enum:['viewer','editor','admin']},
})

export const User=mongoose.model("user",UserSchema) 
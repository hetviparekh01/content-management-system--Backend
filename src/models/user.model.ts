import mongoose, { Schema } from "mongoose";
import { IUser } from "../interfaces/IUser";
import Role from "./role.model";

const UserSchema=new Schema({
    name:{type:String,required:[true,'name is required']},
    email:{type:String,required:[true,'email is required'],unique:true},
    password:{type:String,required:[true,'password is required']},
    role:{type:String,required:[true,'role is required'],enum:['viewer','editor','admin']},
    roleId:{type:mongoose.Schema.Types.ObjectId}
},
{timestamps:true})

 UserSchema.pre('save',async function (next){
        const roleData=await Role.findOne({roleName:this.role});
        if(roleData){
            const roleId=roleData._id;
            this.roleId=roleId
        }   
 })




export const User=mongoose.model("user",UserSchema) 
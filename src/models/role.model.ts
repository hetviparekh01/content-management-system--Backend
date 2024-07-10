import mongoose, { Schema } from "mongoose";

const RoleSchema=new Schema({
    roleName:{
        type:String,
    },
},
{
    timestamps:true
})

const Role=mongoose.model('role',RoleSchema)

export default Role;
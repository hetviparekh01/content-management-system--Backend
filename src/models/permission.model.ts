import mongoose, { Schema } from "mongoose";

const PermissionSchema=new Schema({
    roleId:{
        type:mongoose.Schema.Types.ObjectId,
    },
    moduleId:{
        type:mongoose.Schema.Types.ObjectId,
    },
    read:{
        type:Boolean,
    },
    write:{
        type:Boolean
    }
},
{
    timestamps:true
})

const Permission=mongoose.model('permission',PermissionSchema)

export default Permission;
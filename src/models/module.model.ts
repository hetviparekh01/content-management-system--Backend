import mongoose, { Schema } from "mongoose";

const ModuleSchema=new Schema({
    moduleName:{
        type:String,
    },
},
{
    timestamps:true
})

const Module=mongoose.model('module',ModuleSchema)

export default Module;
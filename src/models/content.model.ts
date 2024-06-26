import mongoose, { Schema, mongo } from "mongoose"
import { IContent } from "../interfaces/IContent"

const ContentSchema=new Schema<IContent>({
    title:{type:String,required:[true,'description is required']},
    userId:{type:mongoose.Schema.Types.ObjectId,required:[true,'userId is required'],ref:'user'},
    type:{type:String,required:[true,'type is required']},
    description:{type:String,required:[true,'description is required']},
    content:{type:String,required:[true,'content is required']},
    createdBy:{type:mongoose.Schema.Types.ObjectId,required:[true,'createdby id is required is required'],ref:'user'},
    updatedBy:{type:mongoose.Schema.Types.ObjectId,required:[true,'updatedby id is required'],ref:'user'},

})

export const Content=mongoose.model("content",ContentSchema) 
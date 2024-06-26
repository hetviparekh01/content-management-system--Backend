import mongoose from "mongoose";

export interface IContent{
    title:string,
    userId?:mongoose.Schema.Types.ObjectId,
    type:string,
    description:string,
    content?:string,
    updatedBy?:mongoose.Schema.Types.ObjectId,
    createdBy?:mongoose.Schema.Types.ObjectId
}

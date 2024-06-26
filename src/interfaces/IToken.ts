import { ObjectId } from "mongoose";

export interface IToken{
    userId:ObjectId,
    role:string,
    email:string
}
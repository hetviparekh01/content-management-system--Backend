import { ObjectId } from "mongoose";

export interface IToken{
    roleId: any;
    userId:ObjectId,
    role:string,
    email:string
}
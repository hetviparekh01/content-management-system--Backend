import { IUser } from "../interfaces/IUser";
import bcrypt from 'bcrypt'
import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from "config";
import { ObjectId } from "mongoose";
export class UserService{
    async signUp(userData:IUser){
        try {
            const hasedpassword= await bcrypt.hash(userData.password,10)
            userData.password=hasedpassword
            const response=await User.create(userData);
            if(response){
                return {status:true,statusCode:200,content:"USER SIGNED UP SUCCESFULLY"}
            }else{
                throw new ApiError(500,"ERROR IN CREATING USER")
            }   
        } catch (error:any) {
            return {status:false,statusCode:error.statusCode || 500,content:error.message}
        }
    }
    async login(userData:IUser){
        try {
            const user=await User.findOne({email:userData.email})
            if(!user){
                throw new ApiError(404,'USER NOT FOUND')
            }
            const isValidate=await bcrypt.compare(userData.password,user.password)
            if(!isValidate){
                throw new ApiError(400,'INVALID CREDENTIALS')
            }
            const payload:JwtPayload={
                userId:user._id,
                email:user.email,
                role:user.role
            }
            const token=await jwt.sign(payload,config.get("secretKey") as string,{expiresIn:'24h'})  

            const response={
                name:user.name,
                role:user.role,
                accessToken:token,
            }
            return {status:true,statusCode:200,content:response}
        } catch (error:any) {
            return {status:false,statusCode:error.statusCode || 500,content:error.message}
        }
    }
    async updateUser(userId:string,userData:IUser){
        try {
            const response=await User.findByIdAndUpdate(userId,userData)
            if(response){
                return {status:true,statusCode:200,content:"USER UPDATED SUCCESFULLY"}
            }else{
                throw new ApiError(500,"ERROR IN UPDATING USER")
            }   
        } catch (error:any) {
            return {status:false,statusCode:error.statusCode || 500,content:error.message}
        }
    }
    async deleteUser(userId:string){
        try {
            const response=await User.findByIdAndDelete(userId)
            if(response){
                return {status:true,statusCode:200,content:"USER DELETED SUCCESFULLY"}
            }else{
                throw new ApiError(500,"ERROR IN DELETING USER")
            }   
        } catch (error:any) {
            return {status:false,statusCode:error.statusCode || 500,content:error.message}
        }
    }
    async getUser(paramsTerm:any){
        try {
            const dynamicQuery={
                $match:{}
            };
            let $and=[{}]
            if(paramsTerm.role){
                $and.push({'role':paramsTerm.role})
            }
            dynamicQuery.$match={...dynamicQuery.$match,$and}
            const response=await User.aggregate([dynamicQuery])
            if(response){
                return {status:true,statusCode:200,content:response,length:response.length}
            }else{
                throw new ApiError(500,"ERROR IN GETTING USER")
            }   
        } catch (error:any) {
            return {status:false,statusCode:error.statusCode || 500,content:error.message}
        }
    }
    async getUserById(userId:string){
        try {
            const response=await User.findById(userId)
            if(response){
                return {status:true,statusCode:200,content:response}
            }else{
                throw new ApiError(500,"ERROR IN GETTING USER")
            }   
        } catch (error:any) {
            return {status:false,statusCode:error.statusCode || 500,content:error.message}
        }
    }
    async getParticularUser(userId:ObjectId){
        try {
            const response=await User.findById(userId)
            if(response){
                return {status:true,statusCode:200,content:response}
            }
            else{
                throw new ApiError(500,"ERROR IN GETTING USER")
            }   
        } catch (error:any) {
            return {status:false,statusCode:error.statusCode || 500,content:error.message}
            
        }
    }
}



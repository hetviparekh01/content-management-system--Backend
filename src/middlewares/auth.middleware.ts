import { Request,Response,NextFunction } from "express";
import { ApiError } from "../utils/ApiError";
import config from "config";
import jwt, { JwtPayload, decode } from 'jsonwebtoken'
import { User } from "../models/user.model";
import { IToken } from "../interfaces/IToken";
declare module 'express-serve-static-core'{
    interface Request{
        user:IToken;
    }
}
export const authMiddleware=async (req:Request,res:Response,next:NextFunction)=>{
    const token=req.headers.authorization?.split(' ')[1];
    if(!token){
        return res
        .status(500)
        .json({status:false,content:"USER NOT LOGGED IN"})
    }
    try {
        const decoded=jwt.verify(token,config.get("secretKey") as string) as JwtPayload
        if(!decoded){
            throw new ApiError(401,"INVALID TOKEN")
        }
        req.user=(decoded as IToken)
        const user=await User.findById(decoded.userId)
        if(!user){
            throw new ApiError(404,"USER IS NOT SIGNED IN")
        }else{
            next();
        }
    } catch (error:any) {
        return res
        .status(error.statusCode ||500)
        .json({status:false,content:error.message})
    }
}       
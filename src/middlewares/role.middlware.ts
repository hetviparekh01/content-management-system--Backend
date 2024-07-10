import {Request,Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";

export const roleMiddleware=(roles:string[])=>{
    return(req:Request,res:Response,next:NextFunction)=>{
        try {
            const userRole=req.user.role;
            if(!roles.includes(userRole)){
                throw new ApiError(403,"UNAUTHORIZED ACESS")
            }else{
                next();
            } 
        } catch (error:any) {
            return res.status(403).json({status:false,error: error.message });
        
        } 
    }
}
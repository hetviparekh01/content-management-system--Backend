import {Request,Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";

export const roleMiddleware=(roles:string[])=>{
    return(req:Request,res:Response,next:NextFunction)=>{
        const userRole=req.user.role;
        if(!roles.includes(userRole)){
            throw new ApiError(403,"UNAUTHORIZED ACESS")
        }else{
            next();
        }    
    }
}
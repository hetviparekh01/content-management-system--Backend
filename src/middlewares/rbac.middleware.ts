import {Request, Response,NextFunction } from "express"
import Module from "../models/module.model"
import Permission from "../models/permission.model";

export const rbac=(roles:string[],moduleName:string,permission:string)=>{
    return async (req:Request,res:Response,next:NextFunction)=>{
        try {
            const moduleData=await Module.findOne({moduleName:moduleName});
            let isAllowed;
            const roleId=req.user.roleId;
    
            if(permission==='write'){
                isAllowed=await Permission.findOne({roleId:roleId,moduleId:moduleData?._id,write:true})
            }else{
                isAllowed=await Permission.findOne({roleId:roleId,moduleId:moduleData?._id,read:true})
            }
            if(!isAllowed){
                throw new Error('ACCESS DENIED')
            }
            else{
                next();
            }
        } catch (error:any) {
            return res.status(403).json({status:false,error: error.message });
        } 
    }
}
import config from "config";
import {v2 as cloudinary} from "cloudinary";
import fs from 'fs'
cloudinary.config({ 
    cloud_name: config.get('cloud_name'), 
    api_key:config.get('api_key') , 
    api_secret: config.get('api_secret') 
  });
  
  export const uploadOnCloudinary = async (localFilePath:string) => {
      try {
          if (!localFilePath) return null
          
          const response = await cloudinary.uploader.upload(localFilePath, {
              resource_type: "auto"
          })
         
        //   fs.unlinkSync(localFilePath)
          return response;
  
      } catch (error) {
        //   fs.unlinkSync(localFilePath) 
          return null;
      }
}

import { UploadStream } from "cloudinary";
import { IContent } from "../interfaces/IContent";
import { Content } from "../models/content.model";
import { ApiError } from "../utils/ApiError";
import { uploadOnCloudinary } from "../utils/cloudinary";
import { ObjectId } from "mongoose";

export class ContentService {
  async postContent(contentData: IContent) {
    try {
      const response = await Content.create(contentData);
      if (response) {
        return {
          status: true,
          statusCode: 200,
          content: "CONTENT UPLOADED SUCCESFULLY",
        };
      } else {
        throw new ApiError(500, "ERROR IN  UPLOADING CONTENT");
      }
    } catch (error: any) {
      return {
        status: false,
        statusCode: error.statusCode || 500,
        content: error.message,
      };
    }
  }
  async updateContent(contentId: string, contentData: IContent) {
    try {
      //   const cloudinaryData = await uploadOnCloudinary(
      //     contentData.content as string
      //   );
      //   if (!cloudinaryData) {
      //     throw new ApiError(503, "ERROR IN  UPLOADING CONTENT ON CLOUDINARY");
      //   } else {
      //     contentData.content = cloudinaryData.url;
      //   }
      console.log(contentId, "in service");
      const response = await Content.findByIdAndUpdate(contentId, contentData);
      if (response) {
        return {
          status: true,
          statusCode: 200,
          content: "CONTENT UPDATED SUCCESFULLY",
        };
      } else {
        throw new ApiError(500, "ERROR IN  UPLOADING CONTENT");
      }
    } catch (error: any) {
      return {
        status: false,
        statusCode: error.statusCode || 500,
        content: error.message,
      };
    }
  }
  async deleteContent(contentId: string) {
    try {
      const response = await Content.findByIdAndDelete(contentId);
      if (response) {
        return {
          status: true,
          statusCode: 200,
          content: "CONTENT DELTETED SUCCESFULLY",
        };
      } else {
        throw new ApiError(500, "ERROR IN DELETING CONTENT");
      }
    } catch (error: any) {
      return {
        status: false,
        statusCode: error.statusCode || 500,
        content: error.message,
      };
    }
  }
  async getContent(paramsTerms: any) {
    try {
      const dynamicQuery = {
        $match: {},
      };
      let $and = [{}];
      if (paramsTerms.type) {
        $and.push({
          type: paramsTerms.type,
        });
      }
      dynamicQuery.$match = { ...dynamicQuery.$match, $and };
      // if(paramsTerms)
      const response = await Content.find({});
      if (response) {
        return {
          status: true,
          statusCode: 200,
          content: response,
        };
      } else {
        throw new ApiError(500, "ERROR IN  GETTING CONTENT");
      }
    } catch (error: any) {
      return {
        status: false,
        statusCode: error.statusCode || 500,
        content: error.message,
      };
    }
  }
  async getContentById(contentId: string) {
    try {
      const response = await Content.findById(contentId);
      if (response) {
        return { status: true, statusCode: 200, content: response };
      } else {
        throw new ApiError(500, "ERROR IN GETTING CONTENT");
      }
    } catch (error: any) {
      return {
        status: false,
        statusCode: error.statusCode || 500,
        content: error.message,
      };
    }
  }
  async getContentOfParticularUser(userId:ObjectId){
    try {
      const response=await Content.find({userId:userId})
      if (response) {
        return { status: true, statusCode: 200, content: response };
      } else {
        throw new ApiError(404, "ERROR IN GETTING CONTENT BY PARTICULAR EDITOR");
      }
    } catch (error:any) {
      return {
        status: false,
        statusCode: error.statusCode || 500,
        content: error.message,
      };
    }
  }
}

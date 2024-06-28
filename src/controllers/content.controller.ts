import { IContent } from "../interfaces/IContent";
import { Request, Response } from "express";
import { ContentService } from "../services/content.service";
import mongoose, { ObjectId } from "mongoose";
import { Content } from "../models/content.model";
const contentService = new ContentService();
export class ContentController {
  async postContent(req: Request, res: Response) {
    try {
      const contentData: IContent = req.body;
      contentData.userId = req.user.userId;
      contentData.createdBy = req.user.userId;
      contentData.updatedBy = req.user.userId;
      const file = req.files as { [fieldname: string]: Express.Multer.File[] };
      contentData.content = file?.content?.[0]?.path;
      const response = await contentService.postContent(contentData);
      if (response.status) {
        return res
          .status(response.statusCode)
          .json({ status: response.status, content: response.content });
      } else {
        return res
          .status(response.statusCode)
          .json({ status: false, content: response.content });
      }
    } catch (error: any) {
      return res.status(500).json({ status: false, content: error.message });
    }
  }
  async updateContent(req: Request, res: Response) {
    try {
      const contentId = req.params.contentId;
      const media=await Content.findById(contentId)
      const mediaPath=media?.content
      const contentData: IContent = req.body;
      contentData.updatedBy = req.user.userId;
      const file = req.files as { [fieldname: string]: Express.Multer.File[] };
      contentData.content = file?.content?.[0]?.path;
      const response = await contentService.updateContent(
        contentId,
        contentData,
        (mediaPath) as string
      );
      if (response.status) {
        return res
          .status(response.statusCode)
          .json({ status: response.status, content: response.content });
      } else {
        return res
          .status(response.statusCode)
          .json({ status: response.status, content: response.content });
      }
    } catch (error: any) {
      return res.status(500).json({ status: false, content: error.message });
    }
  }
  async deleteContent(req: Request, res: Response) {
    try {
      const contentId: string = req.params.contentId;
      const content=await Content.findById(contentId)
      const response = await contentService.deleteContent(contentId,(content?.content)as string);
      if (response.status) {
        return res
          .status(response.statusCode)
          .json({ status: response.status, content: response.content });
      } else {
        return res
          .status(response.statusCode)
          .json({ status: response.status, content: response.content });
      }
    } catch (error: any) {
      return res.status(500).json({ status: false, content: error.message });
    }
  }
  async getContent(req: Request, res: Response) {
    try {
      const response = await contentService.getContent();
      if (response.status) {
        return res
          .status(response.statusCode)
          .json({ status: response.status, content: response.content,length:response.length });
      } else {
        return res
          .status(response.statusCode)
          .json({ status: response.status, content: response.content });
      }
    } catch (error: any) {
      return res.status(500).json({ status: false, content: error.message });
    }
  }
  async getContentById(req: Request, res: Response) {
    try {
      const contentId: string = req.params.contentId;
      const response = await contentService.getContentById(contentId);
      if (response.status) {
        return res
          .status(response.statusCode)
          .json({ status: response.status, content: response.content });
      } else {
        return res
          .status(response.statusCode)
          .json({ status: response.status, content: response.content });
      }
    } catch (error: any) {
      return res.status(500).json({ status: false, content: error.message });
    }
  }
  async getContentByParticularUser(req: Request, res: Response){
    try {
      const userId=req.user.userId;
      const userIdString = userId.toString(); 
      console.log();
      const response=await contentService.getContentOfParticularUser(userIdString)
      if (response.status) {
        return res
          .status(response.statusCode)
          .json({ status: response.status, content: response.content,length:response.length });
      } else {
        return res
          .status(response.statusCode)
          .json({ status: response.status, content: response.content });
      }
    } catch (error:any) {
      return res.status(500).json({ status: false, content: error.message });
    }
  }
  async getContentByMonth(req: Request, res: Response) {
    try {
      const response = await contentService.getContentByMonth();
      if (response.status) {
        return res
          .status(response.statusCode)
          .json({ status: response.status, content: response.content,length:response.length });
      } else {
        return res
          .status(response.statusCode)
          .json({ status: response.status, content: response.content });
      }
    } catch (error: any) {
      return res.status(500).json({ status: false, content: error.message });
    }
  }
}

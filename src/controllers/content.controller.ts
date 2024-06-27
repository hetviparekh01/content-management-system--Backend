import { IContent } from "../interfaces/IContent";
import { Request, Response } from "express";
import { ContentService } from "../services/content.service";
import mongoose, { ObjectId } from "mongoose";
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
      console.log(req.files);
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
      const contentData: IContent = req.body;
      contentData.userId = req.user.userId;
      contentData.createdBy = req.user.userId;
      contentData.updatedBy = req.user.userId;
      const file = req.files as { [fieldname: string]: Express.Multer.File[] };
      contentData.content = file?.content?.[0]?.path;
      const response = await contentService.updateContent(
        contentId,
        contentData
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
      const response = await contentService.deleteContent(contentId);
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
      const paramsTerms = req.query;
      const response = await contentService.getContent(paramsTerms);
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
      const userId=req.user.userId
      const response=await contentService.getContentOfParticularUser(userId as ObjectId)
      if (response.status) {
        return res
          .status(response.statusCode)
          .json({ status: response.status, content: response.content });
      } else {
        return res
          .status(response.statusCode)
          .json({ status: response.status, content: response.content });
      }
    } catch (error:any) {
      return res.status(500).json({ status: false, content: error.message });
    }
  }
  
}

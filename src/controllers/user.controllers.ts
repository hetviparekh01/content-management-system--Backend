import { server } from "typescript";
import { IUser } from "../interfaces/IUser";
import { UserService } from "../services/user.service";
import { Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
const userServcie = new UserService();
export class UserController {
  async signUp(req: Request, res: Response) {
    try {
        const userData: IUser = req.body;
        const response = await userServcie.signUp(userData);
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
      return res
        .status(error.statusCode)
        .json({ status: false, content: error.message });
    }
  }
  async login(req: Request, res: Response) {
    try {
      const userData: IUser = req.body;
      const response = await userServcie.login(userData);
        if (response.status) {
        return res
          .status(response.statusCode)
          .json({ status: response.status, content: response.content });
      } else {
        return res
          .status(response.statusCode)
          .json({ status:  response.status, content: response.content });
      }
    } catch (error: any) {
      return res
        .status(error.statusCode)
        .json({ status: false, content: error.message });
    }
  }
  async updateUser(req: Request, res: Response){
    try {
      const userData: IUser = req.body;
      const userId:string=req.params.id
      const response = await userServcie.updateUser(userId,userData);
      if (response.status) {
        return res
          .status(response.statusCode)
          .json({ status: response.status, content: response.content });
      } else {
        return res
          .status(response.statusCode)
          .json({ status:  response.status, content: response.content });
      }
    } catch (error: any) {
      return res
        .status(error.statusCode)
        .json({ status: false, content: error.message });
    }
  }
  async deleteUser(req: Request, res: Response){
    try {
      const userData: IUser = req.body;
      const userId:string=req.params.id
      const response = await userServcie.deleteUser(userId);
      if (response.status) {
        return res
          .status(response.statusCode)
          .json({ status: response.status, content: response.content });
      } else {
        return res
          .status(response.statusCode)
          .json({ status:  response.status, content: response.content });
      }
    } catch (error: any) {
      return res
        .status(error.statusCode)
        .json({ status: false, content: error.message });
    }
  }
  async getUser(req: Request, res: Response){
    try {
      const response = await userServcie.getUser();
      if (response.status) {
        return res
          .status(response.statusCode)
          .json({ status: response.status, content: response.content });
      } else {
        return res
          .status(response.statusCode)
          .json({ status:  response.status, content: response.content });
      }
    } catch (error: any) {
      return res
        .status(error.statusCode)
        .json({ status: false, content: error.message });
    }
  }

}

import { Router } from "express";
import { ContentController } from "../controllers/content.controller";
import { upload } from "../middlewares/multer.middleware";
import { rbac } from "../middlewares/rbac.middleware";
import { roleMiddleware } from "../middlewares/role.middlware";

const contentRoute=Router();
const contentController=new ContentController()
contentRoute.post('/postcontent',rbac(['admin','editor'],'content','write'),upload.fields([{
    name:'content',
    maxCount:1
}]),contentController.postContent)
contentRoute.put('/updatecontent/:contentId',rbac(['admin','editor'],'content','write'),upload.fields([{
    name:'content',
    maxCount:1
}]),contentController.updateContent)
contentRoute.delete('/deletecontent/:contentId',rbac(['admin','editor'],'content','write'),upload.fields([{
    name:'content',
    maxCount:1
}]),contentController.deleteContent)
contentRoute.get('/getcontent',rbac(['admin','viewer','editor'],'content','read'),contentController.getContent)
contentRoute.get('/getcontent/:contentId',rbac(['admin','editor'],'content','read'),contentController.getContentById)
contentRoute.get('/getcontentofuser',contentController.getContentByParticularUser)
contentRoute.get('/getcontentbymonth',contentController.getContentByMonth)


export default contentRoute
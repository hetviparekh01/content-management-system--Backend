import { Router } from "express";
import { ContentController } from "../controllers/content.controller";
import { upload } from "../middlewares/multer.middleware";

const contentRoute=Router();
const contentController=new ContentController()
contentRoute.post('/postcontent',upload.fields([{
    name:'content',
    maxCount:1
}]),contentController.postContent)
contentRoute.put('/updatecontent/:contentId',upload.fields([{
    name:'content',
    maxCount:1
}]),contentController.updateContent)
contentRoute.delete('/deletecontent/:contentId',upload.fields([{
    name:'content',
    maxCount:1
}]),contentController.deleteContent)
contentRoute.get('/getcontent',contentController.getContent)
contentRoute.get('/getcontent/:contentId',contentController.getContentById)
contentRoute.get('/getcontentofuser',contentController.getContentByParticularUser)
contentRoute.get('/getcontentbymonth',contentController.getContentByMonth)


export default contentRoute
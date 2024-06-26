import { Router } from "express";
import { UserController } from "../controllers/user.controllers";

const userRoute=Router()
const userController=new UserController()
userRoute.post('/signup',userController.signUp)
userRoute.post('/login',userController.login)
userRoute.get('/getusers',userController.getUser)
userRoute.post('/updateuser/:id',userController.updateUser)
userRoute.post('/deleteuser/:id',userController.deleteUser)

export default userRoute
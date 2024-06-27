import { Router } from "express";
import { UserController } from "../controllers/user.controllers";
import { authMiddleware } from "../middlewares/auth.middleware";

const userRoute=Router()
const userController=new UserController()
userRoute.post('/signup',userController.signUp)
userRoute.post('/login',userController.login)
userRoute.get('/getusers',authMiddleware,userController.getUser)
userRoute.post('/updateuser/:id',authMiddleware,userController.updateUser)
userRoute.delete('/deleteuser/:id',authMiddleware,userController.deleteUser)
userRoute.get('/getuserbyid/:id',authMiddleware,userController.getUserById)
userRoute.get('/getparticularuser',authMiddleware,userController.getParticularUser)

export default userRoute    
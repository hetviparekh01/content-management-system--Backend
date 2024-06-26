
import { Router } from "express";
import userRoute from "./user.routes";
import contentRoute from "./content.routes";
import { authMiddleware } from "../middlewares/auth.middleware";

const route=Router()

route.use('/user',userRoute)
route.use('/content',authMiddleware,contentRoute)
export default route
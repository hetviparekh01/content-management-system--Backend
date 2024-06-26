import config from 'config'
import mongoose from 'mongoose'

export const connectDB=()=>{
    return mongoose.connect(config.get("url") as string)
}
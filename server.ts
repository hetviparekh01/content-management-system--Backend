import express from 'express'
import config from 'config'
import cors from 'cors'
import { connectDB } from './src/db/connect'
import route from './src/routes'
import path from 'path'
const app=express()
app.use(express.json())
app.use(cors())
app.use("/public", express.static(path.join(__dirname, 'public')));

app.use('/api',route)
const port=config.get("port")

app.listen(port,()=>{
    console.log(`server is connecting to port ${port}`);
    connectDB()
    .then(()=>{
        console.log("DB Connected!!");
    })
    .catch((err)=>{
        console.log(`Errror in Connecting DB !! ${err}`);
    })
})

console.log(__dirname);

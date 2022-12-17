import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
const URL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.7xkxrf2.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(URL,(err,mongoDBInstance)=>{
if (err){
    throw Error ('mongoDB connection error: '+err)
}
const {host,port,name}=mongoDBInstance;
console.log({host,port,name});
})
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import mongoose from "mongoose"
import connectDb from './configs/mongodb.js'
import { clerkWebhooks } from './controllers/webhooks.js'

//initialize express
const app =express()

//connect to database
await connectDb()

//Middlewares
app.use(cors())


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect("mongodb+srv://LMS_ADMIN:hpMkN0oHHtNqFnZy@cluster0.ozwkw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

//Routes
app.get('/',(req,res)=>res.send('API Working'))
app.post('/clerk',express.json(),clerkWebhooks)


//port
const PORT = process.env.PORT || 5000 

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})


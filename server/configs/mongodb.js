import mongoose from "mongoose";

// connect to the mongoDb database

const connectDB = async()=>{
    mongoose.connection.on ('connected',()=>console.log('database connected'))
    await mongoose.connect(`${process.env.MONGODB_URL}/lms-mern`)

}
export default connectDB
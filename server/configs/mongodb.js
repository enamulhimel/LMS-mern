import mongoose from "mongoose";

// connect to the mongoDb database

const connectDb = async()=>{
    mongoose.connection.on ('connected',()=>console.log('database connected'))
    await mongoose.connect(`${process.env.URL}/lms`)

}
export default connectDb
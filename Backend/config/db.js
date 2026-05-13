import mongoose from "mongoose";

const connectDb = async () =>{
    try {
       const conn =   await mongoose.connect("mongodb://0.0.0.0/learnMate")
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
}

export default connectDb;
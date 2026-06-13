import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDb from "./config/db.js";
import errorHandler from "./middleware/errorHandler.js"

import authRoutes from "./routes/authRoutes.js"
import documentRoutes from "./routes/documentRoutes.js"
import flashcardRoutes from "./routes/flashcardRoutes.js"
import aiRoutes from "./routes/aiRoutes.js"
import quizRoutes from "./routes/quizRoutes.js"
import progressRoutes from "./routes/progressRoutes.js"

import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import User from "./models/User.js";


//ES6 module __dirname alternative
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Initialize express app
const app = express();

//connect to MongoDB
connectDb();

// Middleware to handle CORS
app.use(
    cors({
        origin:"http://localhost:5173",
        methods:["GET","POST","PUT","DELETE"],
        allowedHeaders:["Content-Type","Authorization"],
        credentials:true
    })
);

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//static folder for uploads
// app.use('/uploads',express.static(path.json(__dirname, "uploads")));

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

app.use(passport.initialize());

passport.use(
    new GoogleStrategy(
         {
            clientID:process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL
            
         },
         async (accessToken,refreshToken,profile,cb) => {
             let email = profile.emails[0].value;
             let name = profile.name.givenName;


             let isExisted = await User.findOne({email});

             if(isExisted) return cb(null,isExisted);


             let newUser = await User.create({
                name,
                email,
                provider:profile.provider,
                provider_id:profile.id,
             });

             return cb(null,newUser)
         }
    )
);
        app.get("/",(req,res) => {
    res.send("error in google")
})


//Routes
app.use("/api/auth",authRoutes)
app.use('/api/documents',documentRoutes)
app.use("/api/flashcards",flashcardRoutes)
app.use("/api/ai",aiRoutes)
app.use("/api/quizzes",quizRoutes)
app.use("/api/progress",progressRoutes)
  
app.use(errorHandler);




//404 handler
app.use((req,res) =>{
   res.status(404).json({
    success:false,
    error:"Route not found",
    statusCode:404
   });
});


//start server
const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
    console.log(`server  running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})

process.on('unhandledRejection', (err) => {
    console.error(`Error: ${err.message}`);
    process.exit(1);
});
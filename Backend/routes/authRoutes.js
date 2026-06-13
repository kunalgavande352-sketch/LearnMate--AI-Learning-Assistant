import express from "express";
import { body } from "express-validator";
import {register,login,getProfile,updateProfile,changePassword} from "../controllers/authController.js"
import protect from "../middleware/auth.js"
import jwt from "jsonwebtoken"
import passport from "passport"


const router = express.Router();

//Google verification
 router.get("/google",passport.authenticate("google",{
    scope:["profile","email"],
    session:false
 })
);

router.get("/google/callback",passport.authenticate("google",{failureRedirect:'http://localhost:5173/register',session:false}),
   (req,res) => {
     let token = jwt.sign({id:req.user._id},process.env.JWT_SECRET,{
        expiresIn:'1d'
     });

     res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'lax',  // ← Ye add karo
        maxAge: 24 * 60 * 60 * 1000 // 1 din
     });

     return res.redirect("http://localhost:5173/dashboard");
   }
);

// Validation middleware
const registerValidation = [
  body('username')
   .trim()
   .isLength({min:3})
   .withMessage("Username must be at least 3 characters"),
   body('email')
   .isEmail()
   .normalizeEmail()
   .withMessage('Please provide a valid email'),
   body('password')
   .isLength({min:6})
   .withMessage("Password must be at least 6 characters")
];

const loginValidation = [
    body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email"),
    body('password')
    .notEmpty()
    .withMessage('Password is required')
];


//Public routes
router.post("/register",registerValidation,register);
router.post("/login",loginValidation,login);


//Protected routes
router.get("/profile",protect,getProfile);
router.put("/profile",protect,updateProfile);
router.post("/change-password",protect,changePassword);

export default router;
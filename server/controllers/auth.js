import mongoose from "mongoose"
import User from "../models/User.js"
import bcrypt from "bcryptjs"

export const signup = async (req,res,next)=>{
    try {
        const data = req.body
        const salt =  bcrypt.genSaltSync(10);
        const hash =  bcrypt.hashSync(data.password,salt);
        const newUser = new User({...data , password:hash});
        await newUser.save();
        res.status(200).json({message:"User saved successfully!"});
    } catch (error) {
        next(error)
    }
}
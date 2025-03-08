import mongoose from "mongoose"
import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { createError } from "../error.js"

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

export const signin = async (req,res,next)=>{
    try {
        const user = await User.findOne({name:req.body.name});
        if(!user) return next(createError(404,"User not found"));
        const isCorrect = await bcrypt.compare(req.body.password , user.password)
        if(!isCorrect) return next(createError(400,"Wrong Credentials"));
        // jwt.sign(payload, secretOrPrivateKey, [options, callback])
        const token = jwt.sign({id:user._id},process.env.JWTSECRET);
        const {password,...other} = user._doc;
        res.cookie("access_token",token,{
            httpOnly:true
        }).status(200).json(other);
    } catch (error) {
        
    }
}
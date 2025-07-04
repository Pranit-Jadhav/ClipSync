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
    }catch(err){
         next(err);
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
        next(error)
    }
}

export const googleAuth = async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        const token = jwt.sign({ id: user._id }, process.env.JWTSECRET);
        res
          .cookie("access_token", token, {
            httpOnly: true,
          })
          .status(200)
          .json(user._doc);
      } else {
        const newUser = new User({
          ...req.body,
          fromGoogle: true,
        });
        const savedUser = await newUser.save();
        const token = jwt.sign({ id: savedUser._id }, process.env.JWTSECRET);
        res
          .cookie("access_token", token, {
            httpOnly: true,
          })
          .status(200)
          .json(savedUser._doc);
      }
    } catch (err) {
      next(err);
    }
  };
import { createError } from "../error.js"
import User from "../models/User.js"
import Video from "../models/Video.js";


export const updateUser = async (req,res,next)=>{
 
       if(req.params.id === req.user.id){
        //todo
        try {
            const updateduser = await User.findByIdAndUpdate(req.params.id,{
                $set:req.body
            },{new:true}
        );
            
            res.status(200).json(updateduser);
            
        } catch (error) {
            next(error)
        }
       }else{
        return next(createError(403,"You can only update your account!"));
       }
}

export const deleteUser = async(req,res,next)=>{
    if(req.params.id === req.user.id){
        //todo
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User has been deleted!");

        } catch (error) {
            next(error)
        }
       }else{
        return next(createError(403,"You can only delete your account!"));
       }
}
export const getUser = async (req,res,next)=>{
    try {
        const user = await User.findById(req.params.id);
        if(!user) return next(createError(404,"User not found"));
        res.status(200).json(user);
    } catch (error) {
        next(error)
    }
}
export const subscribe = async (req,res,next)=>{
    try {
        await User.findByIdAndUpdate(req.user.id,{
            $push:{subscribedUsers:req.params.id}
        })
        await User.findByIdAndUpdate(req.params.id,{
            $inc:{subscribers:1},
        })
        res.status(200).json("Subscription successful");
    } catch (error) {
        next(error)
    }
}
export const unsubscribe = async (req,res,next)=>{
    try {
        await User.findByIdAndUpdate(req.user.id,{
            $pull:{subscribedUsers:req.params.id}
        })
        await User.findByIdAndUpdate(req.params.id,{
            $inc: {subscribers:-1},
        })
        res.status(200).json("UnSubscription successful");
    } catch (error) {
        next(error)
    }
}

export const likeUser = async (req,res,next)=>{
    try {
        const id = req.user.id;
        const videoId = req.params.videoId;
       await Video.findByIdAndUpdate(videoId,{
            //add to set: likes the video only once even if hit many times
        $addToSet:{likes:id},
        $pull:{dislikes:id},
       });
       res.status(200).json("Video Liked")

    } catch (error) {
        next(error)
    }
}
export const dislikeUser = async (req,res,next)=>{
    try {
        const id = req.user.id;
        const videoId = req.params.videoId;
       await Video.findByIdAndUpdate(videoId,{
            //add to set: likes the video only once even if hit many times
        $addToSet:{dislikes:id},
        $pull:{likes:id},
       });
       res.status(200).json("Video succefully disliked");

    } catch (error) {
        next(error)
    }
}

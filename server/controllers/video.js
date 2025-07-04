import { createError } from "../error.js";
import Video from "../models/Video.js"
import User from "../models/User.js"


export const addVideo = async (req,res,next)=>{
    const newVideo = new Video({userId:req.user.id,...req.body});
    try {
        const savedVideo = await newVideo.save();
        res.status(200).json(savedVideo);
    } catch (error) {
        next(error)
    }
}
export const updateVideo = async (req,res,next)=>{
    try {
        const video =await Video.findById(req.params.id)
        if(!video) return next(createError(404,"Video not found!"));
        if(req.user.id === video.userId){
            const updatedVideo = await Video.findByIdAndUpdate(req.params.id,{
                $set:req.body
            },{new:true}
        );
        res.status(200).json("Video updated successfully");
        }else{
            next(createError(403,"You can update only your videos"));
        }
        
    } catch (error) {
        next(error);
    }
    
}
export const deleteVideo = async (req,res,next)=>{
    try {
        const video =await Video.findById(req.params.id)
        if(!video) return next(createError(404,"Video not found!"));
        if(req.user.id === video.userId){
            const updatedVideo = await Video.findByIdAndDelete(req.params.id);
        res.status(200).json("Video deleted successfully");
        }else{
            next(createError(403,"You can delete only your videos"));
        }
        
    } catch (error) {
        next(error);
    }
    
}
export const getVideo = async (req,res,next)=>{
    try {
        const video = await Video.findById(req.params.id);
        if(!video) return next(createError(404,"Video not Found"));
        res.status(200).json(video);
    } catch (error) {
        next(error)
    }
    
}
export const addView = async (req,res,next)=>{
    try {
       await Video.findByIdAndUpdate(req.params.id,{
            $inc:{views:1}
        });
        res.status(200).json("The Views has been increased");
    } catch (error) {
        next(error)
    }
    
}
export const randomVideo = async (req,res,next)=>{
    try {
        const video = await Video.aggregate([{ $sample: { size:40 } }])
        res.status(200).json(video);
    } catch (error) {
        next(error)
    }
    
}
export const trendingVideo = async (req,res,next)=>{
    try {
        const video = await Video.find().sort({views: -1})
        // if(!video) return next(createError(404,"Video not Found"));
        res.status(200).json(video);
    } catch (error) {
        next(error)
    }
    
}
export const sub = async (req,res,next)=>{
    try {
        const user = await User.findById(req.user.id);
        const SubscribedChannels = user.subscribedUsers;

        const list = await Promise.all(
            SubscribedChannels.map((channelID)=>{
                return Video.find({userId:channelID})
            })
        )

        res.status(200).json(list.flat().sort((a,b)=> b.createdAt - a.createdAt ));

    } catch (error) {
        next(error)
    }
    
}

export const getBytag = async (req,res,next)=>{
    const tag = req.query.tags.split(",");
    // console.log(tag);
    
    try {
        const video = await Video.find({ tags:{$in:tag}}).limit(20);
        if(!video) return next(createError(404,"Video not Found"));
        res.status(200).json(video);
    } catch (err) {
        next(err);
    }
    
};
export const getbysearch = async (req,res,next)=>{
    const search = req.query.search;
    // console.log(search)
    try {
        const video = await Video.find({title:{$regex: search , $options: "i"}}).limit(40);
        // if(!video) return next(createError(404,"Video not Found"));
        res.status(200).json(video);
    } catch (error) {
        next(error)
    }
    
}
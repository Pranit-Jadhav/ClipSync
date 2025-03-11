import express from "express"
import { addVideo, addView, getbysearch, getBytag, getVideo, randomVideo, sub, trendingVideo } from "../controllers/video.js";
import { verifyToken } from "../verifyToken.js";
const router = express.Router();

// Create / post a video 
router.post("/",verifyToken,addVideo);

//update a video
router.put("/:id",verifyToken,addVideo);

//delete a video
router.delete("/:id",verifyToken,addVideo);

//get a video
router.get("/find/:id",getVideo);

//always update views of video
router.put("/view/:id",addView);
//trending videos
router.get("/trend",trendingVideo);
//random Videos
router.get("/random",randomVideo);
// Subscribed Videos
router.get("/sub",verifyToken,sub);
// get videos by each tag 
router.get("/tags",getBytag);

// get videos by search
router.get("/search",getbysearch);



export default router;
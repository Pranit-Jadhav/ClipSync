import express from "express"
import { addComment, deleteComment, getComment } from "../controllers/comment.js";
import { verifyToken } from "../verifyToken.js";
const router = express.Router();

// add comments
router.post("/",verifyToken,addComment);
//get comments
router.get("/:videoId",getComment);

// delete comments
router.delete("/:id",verifyToken,deleteComment);

export default router;
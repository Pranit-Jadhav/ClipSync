import express from "express"
import {  } from "../controllers/comment.js";
import { signup } from "../controllers/auth.js";
const router = express.Router();

//Create a new user
router.post("/signup",signup);

// user Sign-in / login
router.post("/signin",)


//Google authentication
router.post("/google",)
//

export default router;
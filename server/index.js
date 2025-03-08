import express from "express"
import env from "dotenv"
import mongoose from "mongoose";
import UserRoutes from "./routes/users.js"
import VideoRoutes from "./routes/videos.js"
import CommentRoutes from "./routes/comment.js"
import authRoutes from "./routes/auth.js"
import cookieParser from "cookie-parser";
env.config();

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());

const connect = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("connected to DB");
    } catch (error) {
        console.log(error);
    }
}

app.get("/",(req,res)=>{
    res.send("Hello from pranit jadhav")
})

// App Routes
app.use(cookieParser());
app.use("/api/users",UserRoutes);
app.use("/api/videos",VideoRoutes);
app.use("/api/comments",CommentRoutes);
app.use("/api/auth",authRoutes);
app.use((err,req,res,next)=>{
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    return res.status(status).json({
        success:false,
        status,
        message
    })
})



app.listen(port,()=>{
    connect();
    console.log("Server running on the port 3000");
})
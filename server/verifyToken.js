import jwt from "jsonwebtoken"
import { createError } from "./error.js"


export const verifyToken = async (req,res,next)=>{
    const token = req.cookies.access_token;
    if(!token) return next(createError(401,"Not authenticated.Token not found"));

    jwt.verify(token , process.env.JWTSECRET,(err,user)=>{
        if(err) return next(createError(403,"token not valid"));
        req.user = user;
        next();
    });
}
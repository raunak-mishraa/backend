import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const isAdminUser = asyncHandler(async (req, _, next) => {
   try {
     const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "").trim();
   //   console.log(token,'token');
     if(!token){
        console.log('token not found');
        throw new ApiError(401, "Unauthorized request");
     }

     const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
   //   console.log(decodedToken,'decodedToken');
     const user = await User.findById(decodedToken?._id).select("-password");

     console.log(user,'user');
     if(!user){
        throw new ApiError(401, "Invalid Access Token");
     }

     // Check if the user has isAdmin set to true
     if(!user.isAdmin){
        throw new ApiError(403, "Forbidden: You do not have admin privileges");
     }

     req.user = user;
     next();
   } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Access Token");
   }
});

import { asyncHandler } from "../utils/asyncHandler.js";
import {User} from "../models/user.models.js"
import jwt from "jsonwebtoken"


const validateUser = asyncHandler(async(req, res, next) => {
    
    /**
     * algo
     * check cookie
     * no, send error
     * yes, find user
     * find user by payload
     * user eixst 
     * no, send error
     * yes, add user in req field and next
     */
    const accessToken = req.cookie?.accessToken || req.body.accessToken
    // console.log(accessToken)
    if(!accessToken){
        return res
        .status(404)
        .json({
            statusCode: 404,
            message: "Invalid Token",
            success: false
        })
    }    
    const decodedToken =  jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY)
    // console.log("decoded token :" ,decodedToken)
    const user = await User.findById(decodedToken._id).select("-password -refreshToken")

    if(!user){
        return res
        .status(404)
        .json({
            statusCode: 404,
            message: "Invalid Token",
            success: false
        })
    }

    req.user = user
    // console.log(req.user)
    next()
})


export {
    validateUser
}
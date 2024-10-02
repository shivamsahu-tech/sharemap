import { asyncHandler } from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { User } from "../models/user.models.js"


const generateAccessAndRefreshToken = async(userId) => {
    const user  = await User.findById(userId);
    // console.log(user)
    const accessToken = await user.generateAccessToken()
    const refreshToken = await user.generateRefreshToken()

    user.refreshToken = refreshToken
    await user.save({validateBeforeSave: false})
    return {accessToken, refreshToken}
}

const registerUser = asyncHandler(async(req, res) => {
    // console.log("It come till here")
    // console.log(req.body)
    const {username, name, password} = req.body

    if(!username || !name || !password){
        // console.log("Entered")
        return res
        .status(404)
        .json({
            statusCode: 404,
            message: "All fields required!😖",
            success: false
        })
    }
    const existUser = await User.findOne({
        $or : [{username}]
    })

    if(existUser){
        return res
        .status(404)
        .json({
            statusCode: 404,
            message: "username already exist!🤔",
            success: false
        })
    }

    const user = await User.create({
        username,
        name,
        password
    })

    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id)

    const userData = await User.findById(user._id).select(
        "-password"
    )

    

    const options = {
        httpOnly: true,
        secure: true,
    }

    return res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            "User signed in Successfully",
            {
                user: userData,
                accessToken,
                refreshToken
            }
        )
    )

})

const loginUser = asyncHandler(async(req, res) => {
    const {username, password} = req.body

    if(!username || !password){
        return res
        .status(404)
        .json({
            statusCode: 404,
            message: "All fields required!😖",
            success: false
        })
    }

    const user = await User.findOne({
        $or: [{username}]
    })


    if(!user){
        // console.log("Entered")
        return res
        .status(404)
        .json({
            statusCode: 404,
            message: "username doesn't exist!😒",
            success: false
        })
    }


    const isPasswordCorrect = await user.isPasswordCorrect(password);
//    console.log(isPasswordCorrect)
    if(!isPasswordCorrect){
        return res
        .status(404)
        .json({
            statusCode: 404,
            message: "Invalid user or password!🥸",
            success: false
        })
    }

   
    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id)

    const loggedUser = await User.findById(user._id).select("-password")



    res
    .status(200)
    .cookie("cookie", " by locin")
    .cookie("accessToken", accessToken)
    .cookie("refreshToken", refreshToken)
    .json(
        new ApiResponse(
            200,
            "User log in Successfully",
            {
                user: loggedUser,
                accessToken,
                refreshToken
            }
        )
    )


})

const logoutUser = asyncHandler(async(req, res) => {
    const user = req.user

    await User.findByIdAndUpdate(
        user._id,
        {
            $unset:{
                "refreshToken" : ""
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure : true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
        new ApiResponse(
            200,
            "User logged out successfully"
        )
    )

})


export {
    loginUser,
    registerUser,
    logoutUser,
}
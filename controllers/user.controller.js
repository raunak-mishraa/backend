import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken'
const generateAccessTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    return { accessToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating access and refresh tokens"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, phoneNumber, password } = req.body;
  console.log(req.body)

  if ([fullName, email, password, phoneNumber].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
    return;
  }

  const existedUser = await User.findOne({
    email: email.toLowerCase(),
  });

  if (existedUser) {
    throw new ApiError(409, "Email already taken");
  }

  const user = new User({
    fullName,
    email,
    password,
    phoneNumber,
  });
 
  await user.save();

  const createdUser = await User.findById(user._id).select("-password");

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }
  
  const { accessToken } = await generateAccessTokens(createdUser._id);
  const accessTokenExpiry = jwt.decode(accessToken).exp;
  const optionsAccess = {
    httpOnly: true,
    secure: true,
    expires: new Date(accessTokenExpiry * 1000),
    sameSite: "None",
  };

  return res
    .status(201)
    .cookie("accessToken", accessToken, optionsAccess)
    .json(
        new ApiResponse(
            201,
            "User registered successfully",
            {
                user: createdUser, accessToken
            },
        ));
});

const loginUser = asyncHandler(async (req, res) =>{
    const {email, password} = req.body;
    if(!email){
        throw new ApiError(400, "email is required")
    }

    const user = await User.findOne({
        email: email.toLowerCase()
    })
    if(!user){
        throw new ApiError(404, "User does not exist!")
    }

    const isPasswordValid = await user.isCorrectPassword(password)

    if(!isPasswordValid){
        throw new ApiError(404, "Invalid user credentials")
    }

    const {accessToken} = await generateAccessTokens(user._id);
    const loggedInUser = await User.findById(user._id).select("-password");

    const accessTokenExpiry = jwt.decode(accessToken).exp;

    const optionsAccess = {
        httpOnly: true,
        secure: true,
        expires: new Date(accessTokenExpiry * 1000),
        sameSite: 'None' 
    };

    return res
    .status(200)
    .cookie("accessToken", accessToken, optionsAccess)
    .json(
        new ApiResponse(
            200,
            "User logged In Successfully",
            {
                user: loggedInUser, accessToken
            }
          ),
    )
})


const logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie("accessToken");
    return res.status(200).json(new ApiResponse(200, "User logged out successfully"));
  });

export { 
    registerUser,
    loginUser,
    logoutUser
};
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { uploadOnCloudinary } from "../utils/cloudinaryUpload.js";
import { User } from "../models/user.model.js";
import { Donor } from "../models/donor.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerDonor = asyncHandler(async (req, res) =>{

    const {username , email, password, fullName, phone, address, profile} = req.body;

    const existingDonor = User.find(
        $OR[username, email]
    );

    if(existingDonor){
        throw new ApiError(400, "Username or email already exists");
    }

    const profileLocalPath = req.file?.profile[0]?.path;

    if(profileLocalPath){
        throw new ApiError(400, 'Profile picture is required');
    }

    const profileImage = uploadOnCloudinary(profileLocalPath);

    if(!profileImage){
        throw new ApiError(500, 'Profile picture upload failed');
    }
    
    const newUser = User.create({
        username: username.to_lower(),
        email,
        password
    });

    const donor = Donor.create({
        userId: newUser._id,
        fullName,
        phone,
        address,
        profile: profileImage.url
    });

    const createdDonor = Donor.findById(donar._id).select(
        "-password -refreshToken"
    );

    if(!createdDonor){
        throw new ApiError(500, "Donor registration failed");
    }

    res.status(201).json(
        new ApiResponse(201, "Donor registered successfully")
    );
});

export {
    registerDonor
}
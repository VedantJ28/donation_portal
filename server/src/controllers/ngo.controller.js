import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js";
import { NGO } from "../models/ngo.model.js";
import { uploadOnCloudinary } from "../utils/cloudinaryUpload.js";
import { ApiResponse } from "../utils/ApiResponse.js"

const resgisterNGO = asyncHandler(async (req, res) =>{
    const { username, email, password, organizationName, registrationNumber, phone, address} = req.body;

    console.log(req.body);

    const existingUser = await User.findOne({
        $or: [
            { username: username },
            { email: email }
        ]
    });    
    if (existingUser) {
        throw new ApiError(400, 'User already exists');
    }

    const existingNGO = await NGO.findOne({registrationNumber: registrationNumber});
    if (existingNGO) {
        throw new ApiError(400, 'NGO already exists');
    }

    const profileLocalPath = req.files?.profile[0]?.path;

    let coverLocalPath;
    if (req.files && Array.isArray(req.files.cover) && req.files.cover.length > 0) {
        coverLocalPath = req.files.cover[0].path;
    }

    if(!profileLocalPath){
        throw new ApiError(400, 'Profile picture is required');
    }
    
    const profileImage = await uploadOnCloudinary(profileLocalPath);
    const coverImage = await uploadOnCloudinary(coverLocalPath);

    if(!profileImage){
        throw new ApiError(500, "Cloudinary upload failed");
    }

    const newUser = await User.create({
        username: username,
        email, 
        password,
        role: 'ngo'
    });

    const ngo = await NGO.create({
        userID: newUser._id,
        organizationName,
        registrationNumber,
        phone,
        address,
        profile: profileImage.url,
        coverImage: coverImage?.url || ""
    });

    const createdNGO = await NGO.findById(ngo._id).select(
        "-password -refreshRoken"
    );

    if(!createdNGO){
        throw new ApiError(500, "Failed to register NGO");
    }

    res.status(201).json(
        new ApiResponse(201, createdNGO, "NGO Registered successfully")
    );
});

export {
    resgisterNGO
}
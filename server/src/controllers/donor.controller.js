import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { uploadOnCloudinary } from "../utils/cloudinaryUpload.js";
import { User } from "../models/user.model.js";
import { Donor } from "../models/donor.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Donation } from "../models/donation.model.js";

const registerDonor = asyncHandler(async (req, res) =>{

    const {username , email, password, fullName, phone, address} = req.body;

    const existingDonor = User.findOne({
        $or: [
            { username: username },
            { email: email }
        ]
    });

    if(existingDonor){
        throw new ApiError(400, "Username or email already exists");
    }

    const profileLocalPath = req.files?.profile[0]?.path;

    if(!profileLocalPath){
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

    const createdDonor = Donor.findById(donor._id).select(
        "-password -refreshToken"
    );

    if(!createdDonor){
        throw new ApiError(500, "Donor registration failed");
    }

    res.status(201).json(
        new ApiResponse(201, "Donor registered successfully")
    );
});

const donate = asyncHandler(async (req, res) => {
    const { donorId } = req.params;
    const { receiverId, item, category, quantity } = req.body;

    const donor = await Donor.findById(donorId);
    if(!donor){
        throw new ApiError(404, "Donor not found");
    }

    const receiver = await NGO.findById(receiverId);
    if(!receiver){
        throw new ApiError(404, "Receiver not found");
    }

    const imageLocalPath = req.files?.image[0]?.path;
    if(!imageLocalPath){
        throw new ApiError(400, "Image is required");
    }

    const image = uploadOnCloudinary(imageLocalPath);
    if(!image){
        throw new ApiError(500, "Image upload failed");
    }

    const donation = await Donation.create({
        donor: donor._id,
        receiver: receiver._id,
        item,
        category,
        quantity,
        image: image.url
    });

    if(!donation){
        throw new ApiError(500, "Donation failed");
    }

    res.status(201).json(
        new ApiResponse(201, "Donation added successful")
    );
});

const getDonations = asyncHandler(async (req, res) => {
    const { donorId } = req.params;

    const donor = await Donor.findById(donorId);
    if(!donor){
        throw new ApiError(404, "Donor not found");
    }

    const donations = await Donation.find({ donor: donor._id });

    res.status(200).json(
        new ApiResponse(200, "Donations retrieved successfully", donations)
    );
});

export {
    registerDonor,
    donate,
    getDonations
}
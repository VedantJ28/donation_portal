import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js";
import { NGO } from "../models/ngo.model.js";
import { uploadOnCloudinary } from "../utils/cloudinaryUpload.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import { Donation } from "../models/donation.model.js";
import { Donor } from "../models/donor.model.js";

const resgisterNGO = asyncHandler(async (req, res) =>{
    const { username, email, password, organizationName, registrationNumber, phone, address} = req.body;

    // console.log(req.body);

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

const verifyDonation = asyncHandler(async (req, res) => {
    const { donationId } = req.params;

    const donation = await Donation.findById(donationId);

    if(!donation){
        throw new ApiError(404, "Donation not found");
    }

    const ngoId = await req.user.user;

    if(ngoId != donation.receiverId){
        throw new ApiError(403, "You are not authorized to verify this donation");
    }

    donation.verified = true;
    await donation.save();

    const updatedDonation = await Donation.findById(donationId);

    const donor = await Donor.findById(donation.donorId);
    const receiver = await NGO.findById(donation.receiverId);

    donor.donationsMade.push(donationId);
    receiver.donationsReceived.push(donationId);

    await donor.save();
    await receiver.save();

    res.status(200).json(
        new ApiResponse(200, updatedDonation, "Donation verified successfully")
    );
});



export {
    resgisterNGO,
    verifyDonation
}
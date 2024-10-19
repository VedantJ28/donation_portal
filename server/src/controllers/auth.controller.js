import { NGO } from "../models/ngo.model";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { generateAccessToken, generateRefreshToken } from "../utils/tokenGeneration.js";
import { Donor } from "../models/donor.model.js"

const options = {
    httpOnly: true,
    secure: true
}

const login = asyncHandler(async (req,res) => {
    const {email , password} = req.body;

    if(!(email || password)){
        throw new ApiError(400, "All fields are required");
    }

    const user = User.findOne({email});
    if(!user){
        throw new ApiError(400, "User does not exists");
    }

    const validPassword = await user.isValidPassword(password);
    if(!validPassword){
        throw new ApiError(400, "Invalid Password");
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie('accessToken', options);
    res.cookie('refreshToken', options);

    let userDetails;

    if(user.role === 'ngo'){
        userDetails = await NGO.findById({userId: user._id}).select(" -password -refreshToken ");
    }
    else if(user.role == 'donor'){
        userDetails = await Donor.findById({userId: user._id}).select(" -password -refreshToken ");
    }

    if (!userDetails) {
        throw new ApiError(404, `${user.role.toUpperCase()} details not found`);
    }

    res.status(201)
    .json(
        new ApiResponse(
            201,
            `${user.role.toUpperCase()} logged in successfully`,
            {user : { 
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                ...userDetails}
                , accessToken, refreshToken}
        )
    )  
})

const logout = asyncHandler(async (req,res) => {
    const user = req.user;
    user.refreshToken = null;
    await user.save();

    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    res.status(200).json(new ApiResponse(200, "User logged out successfully"));
})

export { login, logout }
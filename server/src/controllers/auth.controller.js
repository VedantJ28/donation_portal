import { NGO } from "../models/ngo.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { generateAccessToken, generateRefreshToken } from "../utils/tokenGeneration.js";
import { Donor } from "../models/donor.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!(email || password)) {
        throw new ApiError(400, "All fields are required");
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(400, "User does not exists");
    }

    const validPassword = await user.isValidPassword(password);
    if (!validPassword) {
        throw new ApiError(400, "Invalid Password");
    }

    const accessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    user.refreshToken = newRefreshToken;
    await user.save({ validateBeforeSave: false });

    let userDetails;

    if (user.role === 'ngo') {
        userDetails = await NGO.findOne({ userID: user._id }).select(" -password -refreshToken -_id");
    }
    else if (user.role == 'donor') {
        userDetails = await Donor.findOne({ userID: user._id }).select(" -password -refreshToken -_id");
    }

    if (!userDetails) {
        throw new ApiError(404, `${user.role.toUpperCase()} details not found`);
    }

    const cookieOptions = {
        httpOnly: true,
        secure: true,
    }

    res.status(201)
        .cookie('accessToken', accessToken, cookieOptions)
        .cookie('refreshToken', newRefreshToken, cookieOptions)
        .json(
            new ApiResponse(
                201,
                `${user.role.toUpperCase()} logged in successfully`,
                {
                    user: {
                        id: user._id,
                        username: user.username,
                        email: user.email,
                        role: user.role,
                        ...userDetails._doc
                    }
                    , accessToken, newRefreshToken
                }
            )
        )
})

const logout = asyncHandler(async (req, res) => {
    console.log(req.user);
    const userId = req.user.user;

    const user = await User.findById(userId);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    user.refreshToken = null;
    await user.save({ validateBeforeSave: false });

    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    res.status(200).json(new ApiResponse(200, "User logged out successfully"));
})

export { login, logout }
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { NGO } from "../models/ngo.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const verifyNgo = asyncHandler(async (req, res) => {
    const { registrationNumber } = req.params;
    
    if(!registrationNumber){
        throw new ApiError(400, "Registration number is required");
    }

    // Check if the NGO exists
    const ngo = await NGO.findOne({registrationNumber: registrationNumber});
    if(!ngo){
        throw new ApiError(404, "NGO not found");
    }

    // Verify the NGO
    ngo.verified = true;
    await ngo.save({validateBeforeSave: false});

    res.status(200).json(
        new ApiResponse(200, "NGO verified successfully", ngo)
    )
});

export { verifyNgo };
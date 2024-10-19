import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError.js';
import { verifyToken } from '../utils/tokenGeneration.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const authMiddleware = asyncHandler(async (req, res, next) => {
    const token = req.cookies.accessToken || req.headers.authorization?.split(" ")[1];
    
    if (!token) {
        throw new ApiError(401, "Unauthorized, token not found");
    }

    const decoded = await verifyToken(token);
    req.user = decoded;
    next();
});

import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError.js';
import { verifyToken } from '../utils/tokenGeneration.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const authMiddleware = asyncHandler(async (req, res, next) => {
    const token = req.cookies.accessToken || req.headers.authorization?.split(" ")[1];
    
    if (!token) {
        throw new ApiError(401, "Unauthorized, token not found");
    }

    const decoded = verifyToken(token);
    req.user = decoded;
    next();
});

export const verifyAdmin = asyncHandler(async (req, res, next) => {
    const token = req.cookies.adminAccessToken || req.headers.authorization?.split(" ")[1];
    
    if (!token) {
        throw new ApiError(401, "Unauthorized, token not found");
    }

    const decoded = verifyToken(token);
    if (!decoded.isAdmin) {
        throw new ApiError(403, "Forbidden, admin access only");
    }

    req.user = decoded;
    next();
});
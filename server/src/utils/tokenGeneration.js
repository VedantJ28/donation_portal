import jwt from 'jsonwebtoken'

const generateAccessToken = (user) =>{
    return jwt.sign(
        {   
            user:user._id, 
            role:user.role
        },
        process.env.JWT_TOKEN_SECRET,
        process.env.JWT_TOKEN_EXPIRE
    )
}

const generateRefreshToken = (user) =>{
    return jwt.sign(
        {
            user:user._id,
            role:user.role
        },
        process.env.JWT_REFRESH_TOKEN_SECRET,
        process.env.JWT_REFRESH_TOKEN_EXPIRY
    )
}

const verifyToken = (token) => {
    return jwt.verify(token, JWT_TOKEN_SECRET);
}

const verifyRefreshToken = (token) => {
    return jwt.verify(token, JWT_REFRESH_TOKEN_SECRET);
}

export {
    generateAccessToken,
    generateRefreshToken,
    verifyToken,
    verifyRefreshToken
}

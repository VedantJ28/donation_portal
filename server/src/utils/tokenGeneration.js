import jwt from 'jsonwebtoken'

const generateAccessToken = (user) =>{
    return jwt.sign(
        {   
            user:user._id, 
            role:user.role
        },
        process.env.JWT_TOKEN_SECRET,
        {expiresIn: `${process.env.JWT_TOKEN_EXPIRE}`}
    )
}

const generateRefreshToken = (user) =>{
    return jwt.sign(
        {
            user:user._id,
            role:user.role
        },
        process.env.JWT_REFRESH_TOKEN_SECRET,
        {expiresIn: `${process.env.JWT_REFRESH_TOKEN_EXPIRE}`}
    )
}

const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_TOKEN_SECRET);
}

const verifyRefreshToken = (token) => {
    return jwt.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET);
}

export {
    generateAccessToken,
    generateRefreshToken,
    verifyToken,
    verifyRefreshToken
}

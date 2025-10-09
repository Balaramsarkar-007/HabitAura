const rateLimit = require("express-rate-limit");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const User = require('../model/user');

// rate limiter middleware for auth routes
module.exports.authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message : {
    success : false,
    error : 'Too many authentication attempts, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,


  skip: (req) => {
    return req.path === '/health' || req.path === '/api/health';
  }
});

// helper function to generate tokens
const generateAccessToken = (user) => {
   const accessToken = jwt.sign(
          {
              userId : user._id,
              email : user.email,
              username : user.username
          },
          process.env.JWT_ACCESS_SECRET,
          {expiresIn : '20m'}
      );
   return accessToken;
}


// varify token middleware
module.exports.varifyToken = async (req, res, next) => {
  try {
    const accessToken = req.cookies?.accessToken;
    const refreshToken = req.cookies?.refreshToken;

    if(!accessToken && !refreshToken){
      return res.status(401).json({error : "Access denied, No token provided", success: false});
    }

    if(!accessToken && refreshToken){
      try {
        const decodeRefreshToeken = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    
        const user = await User.findById(decodeRefreshToeken.userId);

        if(!user || user.refreshToken !== refreshToken){
          return res.status(401).json({
            success : false,
            message : "Unauthorized user, Please login again"
          })
        }

        const newAccessToken = generateAccessToken(user);

        res.cookie("accessToken", newAccessToken, {
          httpOnly : true,
          secure : true,
          sameSite : 'none',
          maxAge : 20 * 60 * 1000 // 20 minutes
        });

        req.user = user;
        return next();
      } catch (error) {
        console.error('Error verifying refresh token:', error);
        return res.status(401).json({
          success: false,
          message: "Unauthorized user, Please login again"
        });
      }
    }

    const decode = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);

    const user = await User.findById(decode.userId);

    if(!user){
      return res.status(401).json({
        success : false,
        message : "Unauthorized user, Please login again"
      })
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}
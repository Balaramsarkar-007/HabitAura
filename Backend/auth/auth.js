const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require('../model/user');
const bcrypt = require('bcrypt');
const {authLimiter, varifyToken} = require("../middleware/authMiddleware");
const { sendWelcomeMail } = require("../config/mailServer");


// signup route
router.post("/signup", authLimiter, async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);
  try {
    if(!username || !password || !email) {
      return res.status(500).json({error : "All fields required"});
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ 
        success: false,
        error: "User with this email or username already exists" 
      });
    }

    const newUser = new User({
      username,
      email, 
      password
    });

    await newUser.save();
    console.log("New user created:", newUser.username);

    const { accessToken, refreshToken } = newUser.generateToken();

    newUser.refreshToken = refreshToken;
    await newUser.save();

   const welcomeEmail = await sendWelcomeMail(newUser.email, newUser.username);
    if (!welcomeEmail.success) {
      console.error("Error sending welcome email:", welcomeEmail.error);
    }

    res.cookie('accessToken', accessToken, {
      httpOnly : true,
      secure : true,
      sameSite : 'strict',
      maxAge : 20 * 60 * 1000, // 20 minutes
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly : true,
      secure : true,
      sameSite : 'strict',
      maxAge : 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.status(201).json({
      success : true,
      message : "User created successfully",
      user : {
        id : newUser._id,
        username : newUser.username,
        email : newUser.email
      },
      accessToken,
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error", message : error.message });
  }

});

// login
router.post("/login", authLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;

    if(!email || !password) {
      return res.status(400).json({error : "All fields required", success: false});
    }

    const user = await User.findOne({ email });

    if(!user){
      return res.status(401).json({error : "Don't have any account, Please signup fast", success: false});
    }

    const isPasswordValid = await user.comparePassword(password);

    if(!isPasswordValid){
      return res.status(401).json({error : "Invalid email or password", success: false});
    }

    console.log("Password valid for the user:", user.username);

    const { accessToken, refreshToken } = user.generateToken();

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie('accessToken', accessToken, {
      httpOnly : true,
      secure : true,
      sameSite : 'strict',
      maxAge : 20 * 60 * 1000 // 20 minutes
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly : true,
      secure : true,
      sameSite : 'strict',
      maxAge : 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.status(200).json({
      success : true,
      message : "Login successful",
      user : {
        id : user._id,
        username : user.username,
        email : user.email
      },
      accessToken,
    })
  } catch (error) {
    console.log(error);
    res.status(400).json({message : error.message, success : false})
  }
})

// logout
router.post("/logout", async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if(refreshToken){
      try {
        const decode = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        await User.findByIdAndUpdate(decode.userId, {
          $unset : {refreshToken : 1}
        });
      } catch (error) {
        console.log('Error removing refresh token:', error.message);
      }

      // clear cookies
      res.clearCookie("accessToken");
      res.clearCookie('refreshToken');

      res.json({
        success : true,
        message : 'Logout sucessfully'
      })
    }
  } catch (error) {
    console.error('Logout error:', error);
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    
    res.json({
      success: true,
      message: "Logout successful"
    });
  }
})

// refresh token route
router.post('/refresh-token', async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if(!refreshToken){
      return res.status(401).json({error : "No token provided", success: false});
    }

    const decode = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const user = await User.findById(decode.userId);

    if(!user || user.refreshToken !== refreshToken){
      return res.status(401).json({error : "Unauthorized user, Please login again", success: false});
    }

    const { accessToken, refreshToken : newRefreshToken } = user.generateToken();

    user.refreshToken = newRefreshToken;
    await user.save();

    res.cookie('accessToken', accessToken, {
      httpOnly : true,
      secure : true,
      sameSite : 'strict',
      maxAge : 20 * 60 * 1000 // 20 minutes
    });

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly : true,
      secure : true,
      sameSite : 'strict',
      maxAge : 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.status(200).json({
      success  :true,
      message : "Token refreshed successfully",
    })
  } catch (error) {
    console.error('Error refreshing token:', error);
    res.status(500).json({ error: "Internal server error", message : error.message });
  }
});

// get current user info
router.get('/me', varifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password -refreshToken');

    if (!user) {
      return res.status(404).json({
        success : false,
        error : "User not found"
      });
    }

    res.status(200).json({
      success : true,
      message : "User info fetched successfully",
      user : {
        id : user._id,
        username : user.username,
        email : user.email
      }
    });  
  } catch (error) {
    console.log('Get user error:', error);
    res.status(500).json({
      success : false,
      error : "Internal server error"
    })
  }
})

module.exports = router;

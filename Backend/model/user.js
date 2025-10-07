const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [true, "Username is required"],
        minlength: [2, 'Username must be at least 2 characters'],
        maxlength: [50, 'Username cannot exceed 50 characters'],
        trim : true,
    },

    email : {
        type : String,
        required : [true, "Email is required"],
        unique : true,
        lowercase : true,
        trim : true,
        match : [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },

    password : {
        type : String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters']
    },

    refreshToken : {
        type : String,
        default : null
    },

    timezone: {
      type: String,
      default: 'UTC'
    },

    createdAt : {
        type : Date,
        default : Date.now
    }
});

// hash password before save
userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw new Error('Password comparison failed');
    }
}

userSchema.methods.toJson = function(){
    const userObject = this.toObject();
    delete userObject.password;
    delete userObject.refreshTokens;
    return userObject;
}

// generate jwt token
userSchema.methods.generateToken = function(){
    const accessToken = jwt.sign(
        {
            userId : this._id,
            email : this.email,
            username : this.username
        },
        process.env.JWT_ACCESS_SECRET,
        {expiresIn : '20m'}
    );

    const refreshToken = jwt.sign(
        { userId : this._id },
        process.env.JWT_REFRESH_SECRET,
        {expiresIn : '7d'}
    );

    return { accessToken, refreshToken };
}

// userSchema.index({ email: 1 });

module.exports = mongoose.model('User', userSchema);
const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "Habit name is required"],
        trim : true,
        maxlength: [100, 'Habit name cannot exceed 100 characters']
    },

    des : {
        type : String,
        trim : true,
        maxlength: [500, 'Description cannot exceed 500 characters'],
        default : ''
    },

    category : {
        type : String,
        required : [true, "Category is required"],
        enum : ['health', 'fitness', 'mindfulness', 'productivity', 'learning', 'creativity', 'lifestyle', 'other'],
        lowercase : true,
    },

    current : {
        type : Number,
        min : [0, "Current streak cannot be negative"],
        default : 0,
    },

    target : {
        type : Number,
        required : [true, "Target is required"],
        min : [1, "Target must be at least 1"],
        default : 21,
    },

    reminder : {
        active : {
            type : Boolean,
            default : false,
        },
        time: {
            type: String,
            default: '08:00',
            match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format']
        },
        freq : {
            type : String,
            enum : ['daily', 'weekly', 'monthly'],
            default : 'daily',
        },
        lastSent : {
            type : String,
            default : null,
        }
    },

    logo : {
        type : String,
        trim : true,
        default : '🎯',
    },

    bgColor : {
        type : String,
        default : 'bg-blue-100',
    },

    isCompleted : {
        type : Boolean,
        default : false,
    },

    complatedDates : [
        {
            type : String,
            match : [/^\d{2}-\d{2}-\d{4}$/, 'Date must be in DD-MM-YYYY format']
        }
    ],

    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
        index : true,
    },

    isActive : {
        type : Boolean,
        default : true,
    },
}, {
    timestamps : true,
});

// habitSchema.index({ userId: 1,});
habitSchema.index({ userId : 1, isActive : 1});
habitSchema.index({ category : 1});

module.exports = mongoose.model('Habit', habitSchema);
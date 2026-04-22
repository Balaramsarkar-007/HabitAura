const mongoose = require('mongoose');

const aiChartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    role: {
        type: String,
        enum: ['user', 'assistant'],
        required: true,
    },

    message: {
        type: String,
        required: true,
        maxLength: 10000,
    },
}, { timestamps: true });

// Efficient history retrieval sorted by time
aiChartSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('AiChart', aiChartSchema);
const mongoose = require('mongoose');

const advertisementSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: String,
    createdAt: { type: Date, default: Date.now },
    content: String,
    status: String
}, { timestamps: true });

const Advertisement = mongoose.model('Advertisement', advertisementSchema);

module.exports = Advertisement;
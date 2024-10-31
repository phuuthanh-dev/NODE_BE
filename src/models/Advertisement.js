const mongoose = require('mongoose');

const advertisementSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: String,
    content: String,
    status: String,
    image: String,
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'AdvertisementFengShuiTarget' }],
}, { timestamps: true });

const Advertisement = mongoose.model('Advertisement', advertisementSchema);

module.exports = Advertisement;
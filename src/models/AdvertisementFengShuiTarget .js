const mongoose = require('mongoose');

const advertisementFengShuiTargetSchema = new mongoose.Schema({
    attribute_id: { type: mongoose.Schema.Types.ObjectId, require: true },
    TargetType: {
        type: String,
        enum: ['KoiFishBreeds', 'PondFeatures', 'ZodiacElements'],
        required: true,
    }

}, { timestamps: true });

const AdvertisementFengShuiTarget = mongoose.model('AdvertisementFengShuiTarget', advertisementFengShuiTargetSchema);

module.exports = AdvertisementFengShuiTarget;
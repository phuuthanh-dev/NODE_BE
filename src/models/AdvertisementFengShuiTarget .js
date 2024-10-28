const mongoose = require('mongoose');

const advertisementFengShuiTargetSchema = new Schema({
    advertisement_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Advertisement' },
    zodiac_element: { type: mongoose.Schema.Types.ObjectId, ref: 'ZodiacElement' },
    targetType: String
}, { timestamps: true });

const AdvertisementFengShuiTarget = mongoose.model('AdvertisementFengShuiTarget', advertisementFengShuiTargetSchema);

module.exports = AdvertisementFengShuiTarget;
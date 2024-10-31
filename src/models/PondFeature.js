const mongoose = require('mongoose');

const pondFeaturesSchema = new mongoose.Schema({
    targetType: {
        type: String,
        enum: ['Hình dáng', 'Vị trí', 'Hướng'],
        required: true,
    },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Inactive' },
    value: String,
    zodiac_element: { type: mongoose.Schema.Types.ObjectId, ref: 'ZodiacElement' }
}, { timestamps: true });

const PondFeature = mongoose.model('PondFeature', pondFeaturesSchema);

module.exports = PondFeature;
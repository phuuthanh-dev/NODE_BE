const mongoose = require('mongoose');

const pondFeaturesSchema = new mongoose.Schema({
    targetType: {
        type: String,
        enum: ['PondShape', 'Locations', 'Direction'],
        required: true,
    },
    value: String,
    zodiac_element: { type: mongoose.Schema.Types.ObjectId, ref: 'ZodiacElement' }
}, { timestamps: true });

const PondFeature = mongoose.model('PondFeature', pondFeaturesSchema);

module.exports = PondFeature;
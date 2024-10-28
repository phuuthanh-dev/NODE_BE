const mongoose = require('mongoose');

const pondFeaturesSchema = new Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    targetType: String,
    value: String,
    zodiac_element: { type: mongoose.Schema.Types.ObjectId, ref: 'ZodiacElement' }
});

const PondFeature = mongoose.model('PondFeature', pondFeaturesSchema);

module.exports = PondFeature;
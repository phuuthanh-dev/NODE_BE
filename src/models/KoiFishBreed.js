const mongoose = require('mongoose');

const KoiFishBreedSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    image_url: String,
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Inactive' },
    zodiac_element: { type: mongoose.Schema.Types.ObjectId, ref: 'ZodiacElement' }
}, { timestamps: true });

const KoiFishBreed = mongoose.model('KoiFishBreed', KoiFishBreedSchema);

module.exports = KoiFishBreed;
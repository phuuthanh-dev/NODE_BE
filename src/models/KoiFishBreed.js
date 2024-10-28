const mongoose = require('mongoose');

const koiFishBreedSchema = new Schema({
    name: { type: String, required: true },
    description: String,
    image_url: String,
    zodiac_element: { type: mongoose.Schema.Types.ObjectId, ref: 'ZodiacElement' }
});

const KoiFishBreed = mongoose.model('KoiFishBreed', koiFishBreedSchema);

module.exports = KoiFishBreed;
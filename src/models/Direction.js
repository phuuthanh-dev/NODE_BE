const mongoose = require('mongoose');

const directionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    destiny: { type: mongoose.Schema.Types.ObjectId, ref: 'Destiny' }
}, { timestamps: true });

const Direction = mongoose.model('Direction', directionSchema);

module.exports = Direction;
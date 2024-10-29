const mongoose = require('mongoose');

const destinySchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true }
}, { timestamps: true });

const Destiny = mongoose.model('Destiny', destinySchema);

module.exports = Destiny;
const mongoose = require('mongoose');

const adPackageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: Number,
    duration: Number,
    description: String,
    usesPerDur: Number
}, { timestamps: true });

const AdPackage = mongoose.model('AdPackage', adPackageSchema);

module.exports = AdPackage;
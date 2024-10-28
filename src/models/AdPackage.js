const mongoose = require('mongoose');

const adPackageSchema = new Schema({
    name: { type: String, required: true },
    price: Number,
    duration: Number,
    description: String,
    usesPerDur: Number
});

const AdPackage = mongoose.model('AdPackage', adPackageSchema);

module.exports = AdPackage;
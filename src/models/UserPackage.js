const mongoose = require('mongoose');

const userPackageSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    adPackage_id: { type: mongoose.Schema.Types.ObjectId, ref: 'AdPackage' },
    duration: Number,
    startDay: Date,
    usesRemaining: Number
}, { timestamps: true });

const UserPackage = mongoose.model('UserPackage', userPackageSchema);

module.exports = UserPackage;

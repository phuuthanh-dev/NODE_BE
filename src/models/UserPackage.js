const mongoose = require('mongoose');

const userPackageSchema = new Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    adPackage_id: { type: mongoose.Schema.Types.ObjectId, ref: 'AdPackage' },
    duration: Number,
    startDay: Date,
    usesRemaining: Number
});

const UserPackage = mongoose.model('UserPackage', userPackageSchema);

module.exports = UserPackage;

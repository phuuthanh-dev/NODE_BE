const mongoose = require('mongoose');

const userPackageSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    exipreDate: Date,
    tokenPoint: { type: Number, default: 0 },
}, { timestamps: true });

const UserPackage = mongoose.model('UserPackage', userPackageSchema);

module.exports = UserPackage;

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    gender: { type: String, enum: ['Male', 'Female'], required: true },
    birth: { type: Date, required: true },
    zodiac_element: { type: mongoose.Schema.Types.ObjectId, ref: 'ZodiacElement' },
    activationCode: { type: String },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Inactive' },
    role: { type: String, enum: ['Admin', 'User'], default: 'User', required: true },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;

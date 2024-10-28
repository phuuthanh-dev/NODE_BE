const mongoose = require('mongoose');

const roleElementSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }
}, { timestamps: true });

const Role = mongoose.model('Role', roleElementSchema);

module.exports = Role;
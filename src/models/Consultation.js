const mongoose = require('mongoose');

const consultationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    koiFishBreed: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'KoiFishBreed',
    },
    pondFeature: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PondFeature',
    },
    destiny: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Destiny',
    },
    status: {
        type: String,
        enum: ['Chưa nhận','Đã nhận','Từ chối','Đang tư vấn', 'Hoàn thành', 'Hủy'],
        default: 'Chưa nhận'
    },
    timeBooked: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    rejectionReason: {
        type: String
    }
}, { timestamps: true });

const Consultation = mongoose.model('Consultation', consultationSchema);

module.exports = Consultation;
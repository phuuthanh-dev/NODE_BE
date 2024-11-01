const { Schema, model } = require('mongoose');

const transactionSchema = new Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        code: {
            type: String,
            require: true,
            unique: true,
        },
        amount: {
            type: Number,
            required: true,
            min: 0,
        },
        type: {
            type: String,
            enum: ['Withdraw money', 'Deposit money', 'Buy package money'],
            required: true,
        },
        paymentMethod: {
            type: String,
            required: true,
        },
        paymentMessage: {
            type: String,
            default: '',
        },
        paymentUrl: {
            type: String,
            default: '',
        },
        status: {
            type: String,
            enum: ['Pending', 'Success', 'Failed', 'package-money'],
            default: 'Pending',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Transaction = model('Transaction', transactionSchema);
module.exports = Transaction;

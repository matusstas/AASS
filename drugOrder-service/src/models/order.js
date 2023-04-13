const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    pharmacy: {
        type: String,
        required: true,
        trim: true
    },
    drugName: {
        type: String,
        required: true,
        trim: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    }
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;

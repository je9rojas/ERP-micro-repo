const mongoose = require('mongoose');

const PurchaseSchema = new mongoose.Schema({
    productCode: {
        type: String,
        required: true,
    },
    productName: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    invoiceNumber: {
        type: String,
        required: true, // Puedes cambiar esto a `false` si no es obligatorio
    },
    purchaseDate: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Purchase', PurchaseSchema);
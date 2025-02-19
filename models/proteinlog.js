const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProteinLog = Schema({
    date: { 
        type: String, 
        required: true 
    },
    food: { 
        type: String, 
        required: true 
    },
    quantity: { 
        type: Number,
        required: true },
    protein: { 
        type: Number, 
        required: true 
    },
    carbs: { 
        type: Number, 
        required: true 
    }
});

module.exports = mongoose.model('ProteinLog', ProteinLog);
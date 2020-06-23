const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const incomeSchema = new Schema({
    Description: {
        type: String,
        required: [true, 'Please add a description']
    },
    Value: {
        type: Number,
        required: [true, 'Please add a value']
    },
    Date: {
        type: Date,
        default: Date.now()
    }
    //owner
});

const Income = mongoose.model('Income', incomeSchema);

module.exports = Income;
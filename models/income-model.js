const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const incomeSchema = new Schema({
    value: {
        type: Number,
        required: [true, 'Please add a value']
    },
    category: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now()
    },
    owner: { type: Schema.Types.ObjectId, ref: 'User' }
});

const Income = mongoose.model('Income', incomeSchema);

module.exports = Income;
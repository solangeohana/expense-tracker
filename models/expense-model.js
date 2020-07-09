const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
    description: {
        type: String,
    },
    value: {
        type: Number,
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

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
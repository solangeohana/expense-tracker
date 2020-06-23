const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
    description: {
        type: String,
    },
    value: {
        type: Number,
    },
    date: {
        type: Date,
        default: Date.now()
    }
    //owner
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
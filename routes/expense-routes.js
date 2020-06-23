const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Expense = require('../models/expense-model');

// GET route => to get all the expenses
router.get('/', (req, res, next) => {
    Expense.find()
      .then(allTheExpenses => {
        res.json(allTheExpenses);
      })
      .catch(err => {
        res.json(err);
      });
  });

// POST route => to create a new expense
router.post('/new', (req, res, next) => {

    Expense.create({
      description: req.body.description,
      value: req.body.value,
    })
      .then(newExpense => {
        res.json(newExpense); 
      })
      .catch(err => {
        res.json(err);
      });
  });
  

  // GET route => to get a specific expense/detailed view
  router.get('/:id', (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
  });
   
  // PUT route => to update a specific expense
  router.put('/:id', (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
   
    Expense.findByIdAndUpdate(req.params.id, req.body)
      .then(() => {
        res.json({ message: `Expense with ${req.params.id} is updated successfully.` });
      })
      .catch(error => {
        res.json(error);
      });
  });
   
  // DELETE route => to delete a specific project
  router.delete('/:id', (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
   
    Expense.findByIdAndRemove(req.params.id)
      .then(() => {
        res.json({ message: `Expense with ${req.params.id} is removed successfully.` });
      })
      .catch(error => {
        res.json(error);
      });
  });
module.exports = router;

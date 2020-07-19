const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Income = require('../models/income-model');

// GET route => to get all the expenses
router.get('/', (req, res, next) => {
    Income.find({ owner: req.user._id })
      .then(allTheIncomes => {
        res.json(allTheIncomes);
      })
      .catch(err => {
        res.json(err);
      });
  });

// POST route => to create a new expense
router.post('/', (req, res, next) => {

    Income.create({
      value: req.body.value,
      category: req.body.category,
      date: req.body.date,
      owner: req.user._id
    })
      .then(newIncome => {
        res.json(newIncome); 
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
   
    Income.findByIdAndUpdate(req.params.id, req.body)
      .then(() => {
        res.json({ message: `Income with ${req.params.id} is updated successfully.` });
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
   
    Income.findByIdAndRemove(req.params.id)
      .then(() => {
        res.json({ message: `Income with ${req.params.id} is removed successfully.` });
      })
      .catch(error => {
        res.json(error);
      });
  });
module.exports = router;

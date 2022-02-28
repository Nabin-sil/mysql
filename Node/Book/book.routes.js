const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const bookService = require('./book.service');
const bookController = require('./book.controller');


// routes
router.post('/add',  bookController.addSchema, bookController.add);
router.get('/',  bookController.getAll);
router.get('/current', authorize(), bookController.getCurrent);
router.get('/:id', authorize(), bookController.getById);
router.put('/:id', authorize(), bookController.updateSchema, bookController.update);
router.delete('/:id', authorize(), bookController.delete);

module.exports = router;

const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const bookService = require('./book.service');


module.exports = {
    addSchema,
    add,
    getAll,
    getCurrent,
    getById,
    updateSchema,
    update,
    delete: _delete
};


function addSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        author: Joi.string().required(),
        image: Joi.string().required(),
    });
    validateRequest(req, next, schema);
}

function add(req, res, next) {
    bookService.create(req.body)
        .then(() => res.json({ message: 'book added successful' }))
        .catch(next);
}

function getAll(req, res, next) {
    bookService.getAll()
        .then(books => res.json(books))
        .catch(next);
}

function getCurrent(req, res, next) {
    res.json(req.book);
}

function getById(req, res, next) {
    bookService.getById(req.params.id)
        .then(book => res.json(book))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().empty(''),
        author: Joi.string().empty(''),
        image: Joi.string().empty(''),
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    bookService.update(req.params.id, req.body)
        .then(book => res.json(book))
        .catch(next);
}

function _delete(req, res, next) {
    bookService.delete(req.params.id)
        .then(() => res.json({ message: 'book deleted successfully' }))
        .catch(next);
}
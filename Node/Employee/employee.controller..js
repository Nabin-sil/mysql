const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const employeeService = require('./employee.routes');

// routes
router.post('/add', authorize(), addSchema, add);
router.get('/', authorize(), getAll);
router.get('/current', authorize(), getCurrent);
router.get('/:id', authorize(), getById);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);

module.exports = router;


function addSchema(req, res, next) {
    const schema = Joi.object({
        fullname: Joi.string().required(),
        email: Joi.string().required(),
        position: Joi.string().required(),
        salary: Joi.string().required(),
    });
    validateRequest(req, next, schema);
}

function add(req, res, next) {
    employeeService.create(req.body)
        .then(() => res.json({ message: 'Employee added successful' }))
        .catch(next);
}

function getAll(req, res, next) {
    employeeService.getAll()
        .then(employees => res.json(employees))
        .catch(next);
}

function getCurrent(req, res, next) {
    res.json(req.employee);
}

function getById(req, res, next) {
    employeeService.getById(req.params.id)
        .then(employee => res.json(employee))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        fullname: Joi.string().empty(''),
        email: Joi.string().empty(''),
        position: Joi.string().empty(''),
        salary: Joi.string().empty(''),
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    employeeService.update(req.params.id, req.body)
        .then(employee => res.json(employee))
        .catch(next);
}

function _delete(req, res, next) {
    employeeService.delete(req.params.id)
        .then(() => res.json({ message: 'Employee deleted successfully' }))
        .catch(next);
}
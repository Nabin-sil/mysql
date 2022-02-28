const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};


async function getAll() {
    return await db.Book.findAll();
}

async function getById(id) {
    return await getBook(id);
}

async function create(params) {
    // save Book
    await db.Book.create(params);
}

async function update(id, params) {
    const Book = await getBook(id);

    // validate
    // const emailChanged = params.email && Book.email !== params.email;
    // if (emailChanged && await db.Book.findOne({ where: { email: params.email } })) {
    //     throw 'Email "' + params.email + '" is already taken';
    // }

    // copy params to Book and save
    Object.assign(Book, params);
    await Book.save();

}

async function _delete(id) {
    const Book = await getBook(id);
    await Book.destroy();
}

// helper functions

async function getBook(id) {
    const Book = await db.Book.findByPk(id);
    if (!Book) throw 'Book not found';
    return Book;
}


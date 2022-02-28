const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        name: { type: DataTypes.STRING, allowNull: false },
        author: { type: DataTypes.STRING, allowNull: false },
        image: { type: DataTypes.BLOB, allowNull: false },

    };


    return sequelize.define('Book', attributes);
}
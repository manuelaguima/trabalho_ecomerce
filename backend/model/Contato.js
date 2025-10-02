const { DataTypes } = require('sequelize')
const conn = require('../db/conn')

const Contato = conn.define('contatos', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    mensagem: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: 'contatos',
    timestamps: true 
})

module.exports = Contato
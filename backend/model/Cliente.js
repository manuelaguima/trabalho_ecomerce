const { DataTypes } = require('sequelize')
const conn = require('../db/conn')

const Cliente = conn.define('clientes', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
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
    telefone: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'clientes',
    timestamps: true 
})

module.exports = Cliente

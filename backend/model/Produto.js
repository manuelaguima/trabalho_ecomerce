const { DataTypes } = require('sequelize')
const db = require('../db/conn') 

const Produto = db.define('produtos',{
    codProduto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: true 
    },
    modelo: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    preco: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    ativo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true 
    }
},{
    timestamps: true,
    tableName: 'produtos'
})

module.exports = Produto
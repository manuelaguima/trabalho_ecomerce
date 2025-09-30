const express = require('express')
const router = express.Router()
const clienteController = require('../controller/cliente.controller')


router.post('/', clienteController.cadastrar)
router.get('/', clienteController.listar)
router.get('/:id', clienteController.buscarPorId)
router.put('/:id', clienteController.atualizar)
router.delete('/:id', clienteController.deletar)

module.exports = router

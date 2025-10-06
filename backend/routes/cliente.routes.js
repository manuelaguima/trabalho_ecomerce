const express = require('express')
const router = express.Router()
const clienteController = require('../controller/cliente.controller')
const authMiddleware = require('../middleware/auth.middleware')


router.post('/', clienteController.cadastrar)
router.delete('/:id', authMiddleware, clienteController.deletar)

module.exports = router

const express = require('express')
const router = express.Router()
const contatoController = require('../controller/contato.controller')
const authMiddleware = require('../middleware/auth.middleware')

router.post('/', contatoController.cadastrar)
router.put('/:id', authMiddleware, contatoController.editar)

module.exports = router

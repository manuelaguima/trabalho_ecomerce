const express = require('express')
const router = express.Router()

const estoqueController = require('../controller/estoque.controller')
const authMiddleware = require('../middleware/auth.middleware')

router.post('/', authMiddleware, estoqueController.criar)
router.get('/', authMiddleware, estoqueController.listar)

module.exports = router

const express = require('express')
const router = express.Router()
const produtoController = require ('../controller/produto.controller')
const authMiddleware = require('../middleware/auth.middleware')



router.post('/',produtoController.criar)
router.get('/',produtoController.listar)
router.patch('/:id',authMiddleware,produtoController.atualizar)
router.put('/:id', authMiddleware, produtoController.atualizarCompleto)
router.delete('/:id',authMiddleware,produtoController.deletar)

module.exports = router

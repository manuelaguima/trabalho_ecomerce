const Produto = require ('../model/Produto')

async function criar(req, res) {

    try {

        const produto = await Produto.create(req.body)

        return res.status(201).json({
            mensagem: 'Produto criado com sucesso',
            produto
        })

    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

async function listar(req, res) {
    try {
        const produtos = await Produto.findAll()

        return res.status(200).json(produtos)

    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

// Atualizar parcialmente produto (PATCH /produto/)
async function atualizar(req, res) {
    try {
        const { id } = req.params
        const dados = req.body

        const produtoAtualizado = await Produto.findByPk(id)

        await produtoAtualizado.update(dados)

        return res.status(200).json({
            mensagem: 'Produto atualizado com sucesso',
            produto: produtoAtualizado
        })

    } catch (err) {
        return res.status(500).json({ error: err.message })
    }

}

// DELETE - apagar
async function deletar(req, res) {
    try {
        const { id } = req.params

        const produtoApagar = await Produto.findByPk(id)
        await produtoApagar.destroy()

        return res.status(200).json({ mensagem: 'Produto apagado com sucesso' })

    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}


module.exports = { criar, listar, atualizar, deletar }

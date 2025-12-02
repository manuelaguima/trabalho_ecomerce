const Estoque = require('../model/Estoque')
const Produto = require('../model/Produto')

module.exports = {
    async criar(req, res) {
        try {
            const { idProduto, quantidade_atual, quantidade_minima } = req.body

            if (!idProduto) {
                return res.status(400).json({ error: "idProduto é obrigatório." })
            }

            // verifica se produto existe
            const produto = await Produto.findByPk(idProduto)
            if (!produto) {
                return res.status(404).json({ error: "Produto não encontrado." })
            }

            // verifica se já existe estoque
            const existe = await Estoque.findOne({ where: { idProduto } })
            if (existe) {
                return res.status(400).json({ error: "Estoque deste produto já existe." })
            }

            const novoEstoque = await Estoque.create({
                idProduto,
                quantidade_atual,
                quantidade_minima
            })

            return res.status(201).json(novoEstoque)

        } catch (err) {
            console.error(err)
            res.status(500).json({ error: "Erro ao criar estoque." })
        }
    },

    async listar(req, res) {
        try {
            const lista = await Estoque.findAll({
                include: [{ model: Produto }]
            })

            return res.status(200).json(lista)

        } catch (err) {
            console.error(err)
            res.status(500).json({ error: "Erro ao listar estoque." })
        }
    }
}

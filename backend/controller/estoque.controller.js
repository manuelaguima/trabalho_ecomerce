
const Produto = require('../model/Produto');

module.exports = {

    async criar(req, res) {
        try {
            const { idProduto, quantidade_atual, quantidade_minima } = req.body;

            const produto = await Produto.findByPk(idProduto);
            if (!produto) {
                return res.status(404).json({ erro: 'Produto não encontrado' });
            }

            const existe = await Estoque.findOne({ where: { idProduto } });
            if (existe) {
                return res.status(400).json({ erro: 'Este produto já possui estoque' });
            }

            const estoque = await Estoque.create({
                idProduto,
                quantidade_atual,
                quantidade_minima
            });

            return res.status(201).json({
                mensagem: 'Estoque criado com sucesso',
                estoque
            });

        } catch (err) {
            return res.status(500).json({ erro: err.message });
        }
    },

    async listar(req, res) {
        try {
            const estoques = await Estoque.findAll({
                include: [
                    { model: Produto, as: 'produto' }
                ]
            });
            return res.json(estoques);

        } catch (err) {
            return res.status(500).json({ erro: err.message });
        }
    },

    async buscar(req, res) {
        try {
            const { codEstoque } = req.params;

            const estoque = await Estoque.findByPk(codEstoque, {
                include: [{ model: Produto, as: 'produto' }]
            });

            if (!estoque) {
                return res.status(404).json({ erro: 'Estoque não encontrado' });
            }

            return res.json(estoque);

        } catch (err) {
            return res.status(500).json({ erro: err.message });
        }
    },

    async buscarPorProduto(req, res) {
        try {
            const { idProduto } = req.params;

            const estoque = await Estoque.findOne({
                where: { idProduto },
                include: [{ model: Produto, as: 'produto' }]
            });

            if (!estoque) {
                return res.status(404).json({ erro: 'Estoque não encontrado para este produto' });
            }

            return res.json(estoque);

        } catch (err) {
            return res.status(500).json({ erro: err.message });
        }
    },

    async atualizar(req, res) {
        try {
            const { codEstoque } = req.params;

            const estoque = await Estoque.findByPk(codEstoque);
            if (!estoque) {
                return res.status(404).json({ erro: 'Estoque não encontrado' });
            }

            await estoque.update(req.body);

            return res.json({
                mensagem: 'Estoque atualizado com sucesso',
                estoque
            });

        } catch (err) {
            return res.status(500).json({ erro: err.message });
        }
    },

    async alterarQuantidade(req, res) {
        try {
            const { idProduto } = req.params;
            const { quantidade } = req.body; 

            const estoque = await Estoque.findOne({ where: { idProduto } });

            if (!estoque) {
                return res.status(404).json({ erro: 'Estoque não existe para este produto' });
            }

            const novoTotal = estoque.quantidade_atual + quantidade;

            if (novoTotal < 0) {
                return res.status(400).json({ erro: 'Estoque não pode ser negativo' });
            }

            estoque.quantidade_atual = novoTotal;
            await estoque.save();

            return res.json({
                mensagem: 'Quantidade atualizada com sucesso',
                estoque
            });

        } catch (err) {
            return res.status(500).json({ erro: err.message });
        }
    }
};

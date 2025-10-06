const Cliente = require('../model/Cliente')

// Cadastrar cliente
const cadastrar = async (req, res) => {
    const valores = req.body

    if (!valores.nome || !valores.email || !valores.telefone || !valores.senha) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios, responda corretamente!' })
    }

    try {
        const dados = await Cliente.create(valores)
        res.status(201).json({message: "Cliente cadastrado com sucesso"})
    } catch (err) {
        console.error('Erro ao cadastrar os dados', err)
        res.status(500).json({ message: 'Erro ao cadastrar os dados!' })
    }
}

// Deletar cliente
const deletar = async (req, res) => {
    const { id } = req.params

    try {
        const cliente = await Cliente.findByPk(id)
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente não encontrado!' })
        }

        await cliente.destroy()
        res.status(200).json({ message: 'Cliente deletado com sucesso!' })
    } catch (err) {
        console.error('Erro ao deletar cliente', err)
        res.status(500).json({ message: 'Erro ao deletar cliente!' })
    }
}

module.exports = { cadastrar, deletar }

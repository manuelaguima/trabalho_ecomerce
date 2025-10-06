const Contato = require('../model/Contato')

// Cadastrar contato
const cadastrar = async (req, res) => {
    const valores = req.body

    if (!valores.nome || !valores.email || !valores.mensagem) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios, responda corretamente!' })
    }

    try {
        const dados = await Contato.create(valores)
        res.status(201).json({message: "Contato cadastrado com sucesso"})
    } catch (err) {
        console.error('Erro ao cadastrar os dados', err)
        res.status(500).json({ message: 'Erro ao cadastrar os dados!' })
    }
}

// Editar contato
const editar = async (req, res) => {
    const id = req.params.id
    const valores = req.body

    try{
        const contato = Contato.findByPk(id)
        if(!contato){
            return res.status(404).json({error: "Contato não existente"})
        }

        contato.update(valores)
        res.status(201).json({message: "Contato atualizado com sucesso"})
    }
    catch(err){
        console.error('Erro ao atualizar os dados', err)
        res.status(500).json({ message: 'Erro ao atualizar os dados!' })
    }
}

module.exports  = {cadastrar, editar}
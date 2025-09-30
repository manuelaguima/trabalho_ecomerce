const Cliente = require('../model/Cliente')

const login = async (req,res)=>{
    const valores = req.body

    if(!valores.email || !valores.senha){
        return res.status(400).json({message: 'Para o login, informe email e senha!'})
    }

    try{
        const dados = await Cliente.findOne({ where: {email: valores.email }})

        if(!dados){
            return res.status(404).json({message: 'Usuário não encontrado'})
        }

        if(valores.senha === dados.senha){
            return res.status(200).json({
                message: 'login realizado com sucesso!', 
                statusLog: true, 
                nome: dados.nome
            })
        }else{
            return res.status(401).json({message: 'Senha errada! Tente novamente!'})
        }

    }catch(err){
        console.error('Erro ao tentar fazer o login',err)
        res.status(500).json({message:'Erro ao tentar fazer o login'})
    }
}

module.exports = { login }
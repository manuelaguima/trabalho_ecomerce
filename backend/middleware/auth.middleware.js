function authMiddleware(req,res,next){

    const statusLog = req.query.statusLog

    if(!statusLog){
        return res.status(400).json({message: 'Acesso negado! Faça o login!'})
    }

    next()
}

module.exports = authMiddleware
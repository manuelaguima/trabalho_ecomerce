const conn = require('./db/conn')
const Cliente = require('./model/Cliente')
const Contato = require('./model/Contato')

async function syncDataBase() {
    try{
        await conn.sync({force: true})
        console.log('Tabelas Sincronizadas!')
    }catch(err){
        console.error('Erro ao sincronizar tabelas!',err)
    }finally{
        await conn.close()
        console.log('Fechando conexão com banco de dados!')
    }
}

syncDataBase()
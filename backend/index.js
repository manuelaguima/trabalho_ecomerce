const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT
const hostname = 'localhost'

const conn = require('./db/conn')

// Importa rotas
const clienteRoutes = require('./routes/cliente.routes')
const contatoRoutes = require('./routes/contato.routes')

// Middlewares globais
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

// Rota raiz (teste da API)
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Aplicação Rodando!' })
})

// Rotas públicas
app.use('/cliente', clienteRoutes)
app.use('/contato', contatoRoutes)

conn.sync()
.then(()=>{
    app.listen(PORT,hostname, ()=>{
        console.log(`Servidor rodando em http://${hostname}:${PORT}`)
    })
})
.catch((err)=>{
    console.error('Erro ao conectar com o banco de dados!',err)
})



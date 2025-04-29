import express from 'express'
import knex from 'knex'
import cors from 'cors'
import knexdb from './knexfile.js'

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('Servidor rodando!')
})

app.listen(3000, ()=>
    console.log('Servidor rodando na porta 3000.')
)

app.get('/diretores', async (req, res) =>{
    try {
        const diretores = await knexdb('diretores').select('*')
        res.status(200).json(diretores)
    } catch (error){
        res.status(500).json({error: 'Erro ao buscar diretores.'})
    }
})

app.post('/diretores', async (req, res) =>{
    const {nome, nacionalidade} = req.body

    try {
        const novoDiretor = await knexdb('diretores').insert({nome, nacionalidade})
        res.status(201).json({id: novoDiretor[0], nome, nacionalidade})
    } catch (error){
        console.error('Erro ao adicionar diretor', error)
        res.status(500).json({error: 'Erro ao adicionar diretor.'})
    }
})



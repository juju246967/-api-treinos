const express = require('express');
const controller = require('./controllers/treinosController.js');

const app = express();

app.use(express.json());

// Listar todos os treinos
app.get('/treinos', controller.listar);

// Buscar treino por ID
app.get('/treinos/:id', controller.buscarUm);

// Cadastrar treino
app.post('/treinos', controller.criar);

// Atualizar treino
app.put('/treinos/:id', controller.atualizar);

// Excluir treino
app.delete('/treinos/:id', controller.remover);

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
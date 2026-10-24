
const express = require('express');
const app = express();

app.use(express.json());

const treinos = [];
let proximoId = 1;

// Valida os dados do treino
function validarTreino(corpo) {
    if (!corpo || typeof corpo.nome !== 'string' || corpo.nome.trim() === '') {
        return 'O nome do treino é obrigatório.';
    }

    if (typeof corpo.duracao !== 'number' || corpo.duracao <= 0) {
        return 'A duração deve ser um número maior que zero.';
    }

    if (corpo.observacao !== undefined &&
    typeof corpo.observacao !== 'string') {
    return 'A observação deve ser um texto.';
}

    return null;
}

// GET /treinos - lista todos os treinos
app.get('/treinos', (req, res) => {
    const minimo = req.query.minimo;

    if (minimo !== undefined) {
        const duracaoMinima = Number(minimo);
        const filtrados = treinos.filter(
            treino => treino.duracao >= duracaoMinima
        );

        return res.status(200).json(filtrados);
    }

    res.status(200).json(treinos);
});

app.get('/treinos/resumo', (req, res) => {
    const quantidade = treinos.length;

    const minutosTotais = treinos.reduce(
        (total, treino) => total + treino.duracao,
        0
    );

    res.status(200).json({
        quantidade,
        minutosTotais
    });
});

// GET /treinos/:id - busca um treino
app.get('/treinos/:id', (req, res) => {
    const id = Number(req.params.id);
    const treino = treinos.find(t => t.id === id);

    if (!treino) {
        return res.status(404).json({ erro: 'Treino não encontrado.' });
    }

    res.status(200).json(treino);
});

// POST /treinos - cria um treino
app.post('/treinos', (req, res) => {
    const erro = validarTreino(req.body);

    if (erro) {
        return res.status(400).json({ erro });
    }

    const treino = {
        id: proximoId++,
        nome: req.body.nome.trim(),
        duracao: req.body.duracao,
        observacao: req.body.observacao
    };

    treinos.push(treino);
    res.status(201).json(treino);
});

// PUT /treinos/:id - atualiza um treino
app.put('/treinos/:id', (req, res) => {
    const id = Number(req.params.id);
    const treino = treinos.find(t => t.id === id);

    if (!treino) {
        return res.status(404).json({ erro: 'Treino não encontrado.' });
    }

    const erro = validarTreino(req.body);

    if (erro) {
        return res.status(400).json({ erro });
    }

    treino.nome = req.body.nome.trim();
    treino.duracao = req.body.duracao;
    treino.observacao = req.body.observacao;

    res.status(200).json(treino);
});

// DELETE /treinos/:id - remove um treino
app.delete('/treinos/:id', (req, res) => {
    const id = Number(req.params.id);
    const indice = treinos.findIndex(t => t.id === id);

    if (indice === -1) {
        return res.status(404).json({ erro: 'Treino não encontrado.' });
    }

    treinos.splice(indice, 1);
    res.status(204).send();
});

const PORTA = 3000;

app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
});

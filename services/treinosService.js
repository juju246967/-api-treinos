
const repository = require('../repositories/treinosRepository.js');

function validarTreino(corpo) {
    if (
        !corpo ||
        typeof corpo.nome !== 'string' ||
        corpo.nome.trim() === ''
    ) {
        return 'O campo nome é obrigatório e deve ser um texto.';
    }

    if (
        typeof corpo.duracao !== 'number' ||
        corpo.duracao <= 0
    ) {
        return 'O campo duracao é obrigatório e deve ser um número maior que zero.';
    }

    if (corpo.duracao > 180) {
        return 'A duração máxima do treino é de 180 minutos.';
    }

    return null;
}

function listarTodos() {
    return repository.listarTodos();
}

function buscarPorId(id) {
    return repository.buscarPorId(id);
}

function criarTreino(corpo) {
    const erro = validarTreino(corpo);

    if (erro !== null) {
        return { erro };
    }

    return {
        treino: repository.criar(corpo.nome.trim(), corpo.duracao)
    };
}

function atualizarTreino(id, corpo) {
    const existente = repository.buscarPorId(id);

    if (existente === undefined) {
        return { naoEncontrado: true };
    }

    const erro = validarTreino(corpo);

    if (erro !== null) {
        return { erro };
    }

    return {
        treino: repository.atualizar(id, corpo.nome.trim(), corpo.duracao)
    };
}

function removerTreino(id) {
    const existente = repository.buscarPorId(id);

    if (existente === undefined) {
        return { naoEncontrado: true };
    }

    repository.remover(id);

    return { removido: true };
}

module.exports = {
    listarTodos,
    buscarPorId,
    criarTreino,
    atualizarTreino,
    removerTreino
};

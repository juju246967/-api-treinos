
const bcrypt = require('bcrypt');
const db = require('./banco.js');

async function criarUsuariosDeTeste() {
    const senhaJulio = await bcrypt.hash('5130', 10);
    const senhaAluno = await bcrypt.hash('senha', 10);

    const inserir = db.prepare(`
        INSERT OR IGNORE INTO usuarios (usuario, senha_hash)
        VALUES (?, ?)
    `);

    const atualizar = db.prepare(`
        UPDATE usuarios
        SET senha_hash = ?
        WHERE usuario = ?
    `);

    inserir.run('julio', senhaJulio);
    inserir.run('aluno', senhaAluno);

    atualizar.run(senhaJulio, 'julio');
    atualizar.run(senhaAluno, 'aluno');

    console.log('Usuarios criados com hash!');
}

criarUsuariosDeTeste()
    .catch((erro) => {
        console.error(erro);
        process.exitCode = 1;
    });

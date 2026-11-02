const { DatabaseSync } = require('node:sqlite');

const db = new DatabaseSync('treinos.db');

db.exec(`
    CREATE TABLE IF NOT EXISTS treinos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        duracao INTEGER NOT NULL
    )
`);

db.exec(`
    CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario TEXT NOT NULL UNIQUE,
        senha TEXT NOT NULL
    )
`);

const inserirUsuario = db.prepare(
    'INSERT OR IGNORE INTO usuarios (usuario, senha) VALUES (?, ?)'
);
inserirUsuario.run('julio', '5130');
inserirUsuario.run('aluno', 'senha');

module.exports = db;

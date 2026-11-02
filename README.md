# API do Diário de Treinos

Projeto de Programação Back-End I — CEEP Pedro Boaretto Neto.

## Como executar

Dentro desta pasta, execute:

```bash
npm install
npm start
```

O servidor ficará disponível em `http://localhost:3000`. É necessário usar uma versão recente do Node.js que ofereça `node:sqlite` (Node 22.13 ou superior).

## Rotas de treinos

| Método | Rota | Resposta principal |
|---|---|---|
| GET | `/treinos` | 200 — lista os treinos |
| GET | `/treinos/:id` | 200 ou 404 |
| POST | `/treinos` | 201 ou 400; exige login (Aula 05) |
| PUT | `/treinos/:id` | 200, 400 ou 404 |
| DELETE | `/treinos/:id` | 204 ou 404 |

A validação exige nome preenchido e duração numérica maior que zero e de até 180 minutos.

## Autenticação — Aula 05

| Método | Rota | Função |
|---|---|---|
| POST | `/login` | inicia uma sessão e envia o cookie `sid` |
| GET | `/perfil` | retorna o usuário da sessão |
| POST | `/logout` | encerra a sessão e limpa o cookie |

Usuários iniciais para teste:

- `julio` — senha `5130`
- `aluno` — senha `senha`

Os usuários são inseridos com `INSERT OR IGNORE`, então o usuário Julio também é criado se o banco já existir. As senhas ficam em texto puro apenas conforme o exercício didático da Aula 05; não use essa abordagem em um sistema real.

## Testes

Abra `testes.http` no VS Code com a extensão REST Client e execute as requisições na ordem indicada. O REST Client guarda e reenvia o cookie automaticamente.

O arquivo `AULA` contém `05`, indicando a etapa atual da atividade.

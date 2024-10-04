const express = require('express');
const db = require('./db/db.js'); // Certifique-se de que o arquivo database.js está no mesmo diretório
const app = express();
const port = 3000;

// Middleware para parsing do corpo das requisições como JSON
app.use(express.json());

// Rota padrão "/"
app.get('/', (req, res) => {
  res.send('Rota Raiz');
});

// Rota GET "/alunos" - Retorna a lista de alunos
app.get('/alunos', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM alunos');
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar alunos', error: err.message });
  }
});

// Rota GET "/alunos/:id" - Retorna um aluno específico pelo ID
app.get('/alunos/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const result = await db.query('SELECT * FROM alunos WHERE id = $1', [id]);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'Aluno não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar aluno', error: err.message });
  }
});

// Rota POST "/alunos" - Cria um novo aluno
app.post('/alunos', async (req, res) => {
  const { nome, email, data_nascimento, cpf } = req.body;
  if (!nome || !email || !data_nascimento || !cpf) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
  }
  try {
    const result = await db.query(
      'INSERT INTO alunos (nome, email, data_nascimento, cpf) VALUES ($1, $2, $3, $4) RETURNING id',
      [nome, email, data_nascimento, cpf]
    );
    res.status(201).json({ id: result.rows[0].id });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar aluno', error: err.message });
  }
});

// Rota PUT "/alunos/:id" - Atualiza um aluno
app.put('/alunos/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { nome, email, data_nascimento, cpf } = req.body;
  if (!nome || !email || !data_nascimento || !cpf) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
  }
  try {
    const result = await db.query(
      'UPDATE alunos SET nome = $1, email = $2, data_nascimento = $3, cpf = $4 WHERE id = $5 RETURNING id',
      [nome, email, data_nascimento, cpf, id]
    );
    if (result.rows.length > 0) {
      res.status(200).json({ id: result.rows[0].id });
    } else {
      res.status(404).json({ message: 'Aluno não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar aluno', error: err.message });
  }
});

// Rota DELETE "/alunos/:id" - Deleta um aluno
app.delete('/alunos/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const result = await db.query('DELETE FROM alunos WHERE id = $1 RETURNING id', [id]);
    if (result.rows.length > 0) {
      res.status(200).json({ message: `Aluno ${id} deletado com sucesso` });
    } else {
      res.status(404).json({ message: 'Aluno não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar aluno', error: err.message });
  }
});

// Inicia o servidor na porta especificada
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

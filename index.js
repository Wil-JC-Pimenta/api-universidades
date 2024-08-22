const express = require('express');
const app = express();
const port = 3000;

// Array para armazenar os dados dos alunos
let alunos = [];

// Middleware para parsing do corpo das requisições como JSON
app.use(express.json());

// Rota padrão "/"
app.get('/', (req, res) => {
  res.send('API Escolas e Universidades');
});

// Rota GET "/alunos" - Retorna a lista de alunos
app.get('/alunos', (req, res) => {
  res.json(alunos);
});

// Rota GET "/alunos/:id" - Retorna um aluno específico pelo ID
app.get('/alunos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const aluno = alunos.find(a => a.id === id);
  if (aluno) {
    res.json(aluno);
  } else {
    res.status(404).json({ message: 'Aluno não encontrado' });
  }
});

// Rota POST "/alunos" - Cria um novo aluno
app.post('/alunos', (req, res) => {
  const { nome, email, dataNascimento, cpf } = req.body;
  const id = alunos.length + 1; // Gerando um ID simples para cada aluno
  const novoAluno = { id, nome, email, dataNascimento, cpf };
  alunos.push(novoAluno); // Adiciona o novo aluno ao array
  res.status(201).json(novoAluno);
});

// Rota PUT "/alunos" - Atualiza um aluno
app.put('/alunos', (req, res) => {
  const { nome, email, dataNascimento, cpf } = req.body;
  const idAluno = parseInt(req.query.id_aluno);
  const index = alunos.findIndex(a => a.id === idAluno);

  if (index !== -1) {
    alunos[index] = { id: idAluno, nome, email, dataNascimento, cpf };
    res.status(202).json(alunos[index]);
  } else {
    res.status(404).json({ message: 'Aluno não encontrado' });
  }
});

// Rota DELETE "/alunos" - Deleta um aluno
app.delete('/alunos', (req, res) => {
  const idAluno = parseInt(req.query.id_aluno);
  const index = alunos.findIndex(a => a.id === idAluno);

  if (index !== -1) {
    alunos.splice(index, 1);
    res.status(202).json({ message: `O aluno ${idAluno} foi deletado com sucesso` });
  } else {
    res.status(404).json({ message: 'Aluno não encontrado' });
  }
});

// Inicia o servidor na porta especificada
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

const express = require('express');
const alunoRoutes = require('./routes/alunoRoutes');

const app = express();
app.use(express.json());

// Usando as rotas de aluno
app.use('/api', alunoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

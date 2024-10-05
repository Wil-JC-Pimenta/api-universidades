const express = require('express');
const router = express.Router();
const alunoController = require('../controller/alunoController');

// Definindo rotas para alunos
router.get('/alunos', alunoController.getAll);         // Função getAll deve estar definida no alunoController
router.get('/alunos/:id', alunoController.getById);    // Função getById deve estar definida no alunoController
router.post('/alunos', alunoController.create);        // Função create deve estar definida no alunoController
router.put('/alunos/:id', alunoController.update);     // Função update deve estar definida no alunoController
router.delete('/alunos/:id', alunoController.delete);  // Função delete deve estar definida no alunoController

module.exports = router;

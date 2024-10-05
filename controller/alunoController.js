const Aluno = require('../model/alunoModel'); 

class AlunoController {
  static async getAll(req, res) {
    try {
      const result = await Aluno.getAll();
      res.status(200).json(result.rows);
    } catch (err) {
      res.status(500).json({ message: 'Erro ao buscar alunos', error: err.message });
    }
  }

  static async getById(req, res) {
    const id = parseInt(req.params.id);
    try {
      const result = await Aluno.getById(id);
      if (result.rows.length > 0) {
        res.status(200).json(result.rows[0]);
      } else {
        res.status(404).json({ message: 'Aluno não encontrado' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Erro ao buscar aluno', error: err.message });
    }
  }

  static async create(req, res) {
    const { nome, email, data_nascimento, cpf } = req.body;
    if (!nome || !email || !data_nascimento || !cpf) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }
    try {
      const result = await Aluno.create({ nome, email, data_nascimento, cpf });
      res.status(201).json({ id: result.rows[0].id });
    } catch (err) {
      res.status(500).json({ message: 'Erro ao criar aluno', error: err.message });
    }
  }

  static async update(req, res) {
    const id = parseInt(req.params.id);
    const { nome, email, data_nascimento, cpf } = req.body;
    if (!nome || !email || !data_nascimento || !cpf) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }
    try {
      const result = await Aluno.update(id, { nome, email, data_nascimento, cpf });
      if (result.rows.length > 0) {
        res.status(200).json({ id: result.rows[0].id });
      } else {
        res.status(404).json({ message: 'Aluno não encontrado' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Erro ao atualizar aluno', error: err.message });
    }
  }

  static async delete(req, res) {
    const id = parseInt(req.params.id);
    try {
      const result = await Aluno.delete(id);
      if (result.rows.length > 0) {
        res.status(200).json({ message: `Aluno ${id} deletado com sucesso` });
      } else {
        res.status(404).json({ message: 'Aluno não encontrado' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Erro ao deletar aluno', error: err.message });
    }
  }
}

module.exports = AlunoController;

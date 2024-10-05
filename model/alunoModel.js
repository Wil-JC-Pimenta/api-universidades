const db = require('../db/db'); 


class Aluno {
  static async getAll() {
    return db.query('SELECT * FROM alunos');
  }

  static async getById(id) {
    return db.query('SELECT * FROM alunos WHERE id = $1', [id]);
  }

  static async create({ nome, email, data_nascimento, cpf }) {
    return db.query(
      'INSERT INTO alunos (nome, email, data_nascimento, cpf) VALUES ($1, $2, $3, $4) RETURNING id',
      [nome, email, data_nascimento, cpf]
    );
  }

  static async update(id, { nome, email, data_nascimento, cpf }) {
    return db.query(
      'UPDATE alunos SET nome = $1, email = $2, data_nascimento = $3, cpf = $4 WHERE id = $5 RETURNING id',
      [nome, email, data_nascimento, cpf, id]
    );
  }

  static async delete(id) {
    return db.query('DELETE FROM alunos WHERE id = $1 RETURNING id', [id]);
  }
}

module.exports = Aluno; 

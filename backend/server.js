const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

// Configuração do bodyParser para processar JSON
app.use(bodyParser.json());

// Conectar ao banco de dados MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',  // Coloque sua senha aqui, se houver
  database: 'ssm2024',
  port: 3306,
});

// Conectar ao MySQL
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados MySQL:', err.message);
  } else {
    console.log('Conectado ao banco de dados MySQL');
  }
});

// Rota para obter todos os usuários
app.get('/api/usuarios', (req, res) => {
  db.query('SELECT * FROM Usuarios', (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ usuarios: result });
  });
});

// Rota para obter todos os chamados
app.get('/api/chamados', (req, res) => {
  db.query('SELECT * FROM Chamados', (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ chamados: result });
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor está ouvindo na porta ${port}`);
});

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const crypto = require('crypto');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

// Configuração da conexão com o banco de dados MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ssm2024',
});

// Conectar ao banco de dados
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conexão bem-sucedida ao banco de dados');
  }
});

// Rota para obter todos os usuários
app.get('/api/usuarios', (req, res) => {
  const query = 'SELECT * FROM usuarios';
  db.query(query, (error, results) => {
    if (error) {
      console.error('Erro ao obter usuários do banco de dados:', error);
      res.status(500).end();
    } else {
      res.status(200).json(results);
    }
  });
});

// Rota para obter todos os chamados
app.get('/api/chamados', (req, res) => {
  const query = 'SELECT * FROM chamados';
  db.query(query, (error, results) => {
    if (error) {
      console.error('Erro ao obter chamados do banco de dados:', error);
      res.status(500).end();
    } else {
      res.status(200).json(results);
    }
  });
});


// Gera uma chave secreta aleatória de 32 bytes
const generateSecretKey = () => {
  return crypto.randomBytes(32).toString('hex');
};

// Chave secreta para assinar tokens JWT
const secretKey = generateSecretKey();

// Rota para verificar autenticação
app.get('/api/check-auth', (req, res) => {
  const token = req.headers.authorization;

  if (isValidToken(token)) {
    res.status(200).end();
  } else {
    res.status(401).end();
  }
});

// Rota para login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Buscar usuário no banco de dados
    const query = 'SELECT * FROM usuarios WHERE Login = ?';
    db.query(query, [username], async (error, results) => {
      if (error) {
        console.error('Erro ao buscar usuário no banco de dados:', error);
        res.status(500).end();
      } else {
        const user = results[0];

        if (user && await bcrypt.compare(password, user.Senha)) {
          const token = generateToken(user);
          res.status(200).json({ token });
        } else {
          res.status(401).end();
        }
      }
    });
  } catch (error) {
    console.error('Erro ao processar login:', error);
    res.status(500).end();
  }
});

// Função para verificar se o token é válido
function isValidToken(token) {
  try {
    const decoded = jwt.verify(token, secretKey);
    return true;
  } catch (error) {
    return false;
  }
}

// Função para gerar um token simples (não seguro para produção)
function generateToken(user) {
  return jwt.sign({ userId: user.ID, username: user.Login }, secretKey, { expiresIn: '1h' });
}

app.listen(port, () => {
  console.log(`Servidor está ouvindo na porta ${port}`);
});

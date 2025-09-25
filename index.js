require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env

const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

const routes = require('./routes'); // Suas rotas principais (session, spots, dashboard)
const BookingRoutes = require('./routes/Booking.routes'); // Rotas das reservas (bookings)

const app = express();

// Habilita o Express para entender requisições com corpo JSON
app.use(express.json());

// Habilita CORS para aceitar requisições de outros domínios (frontend)
app.use(cors());

// Rota raiz só pra teste, responde que a API está rodando
app.get('/', (req, res) => {
  return res.send('API AirCNC rodando...');
});

// Usa as rotas principais
app.use(routes);

// Usa as rotas de Booking
app.use('/', BookingRoutes);

// Disponibiliza a pasta de arquivos estáticos (imagens dos spots)
app.use('/files', express.static(path.resolve(__dirname, 'uploads')));

// Rota simples de ping para teste de conexão
app.get('/ping', (req, res) => {
  console.log('recebeu ping');
  res.send('pong');
});

// Função para conectar no banco MongoDB Atlas
async function startDatabase() {
  const { DB_USER, DB_PASS, DB_NAME } = process.env;

  // String de conexão com usuário, senha e nome do banco
  const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.81ivp.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

  try {
    // Tenta conectar no MongoDB
    await mongoose.connect(uri);
    console.log('Conectado ao MongoDB Atlas');
  } catch (error) {
    // Se falhar, mostra o erro e encerra a aplicação
    console.error('Erro ao conectar ao MongoDB: ', error.message);
    process.exit(1);
  }
}

// Inicia a conexão com o banco e depois sobe o servidor na porta definida
startDatabase().then(() => {
  const port = process.env.PORT || 3335;
  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });
});
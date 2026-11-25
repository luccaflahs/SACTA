import express from 'express';
import livroRoutes from './routes/livroRoutes.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/ok', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/livros', livroRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});


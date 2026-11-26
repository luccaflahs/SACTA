import express from 'express';
import authRoutes from './routes/authRoutes.js';
import frequenciaRoutes from './routes/frequenciaRoutes.js';
import livroRoutes from './routes/livroRoutes.js';
import turmaRoutes from './routes/turmaRoutes.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/ok', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/auth', authRoutes);
app.use('/turma', turmaRoutes);
app.use('/frequencia', frequenciaRoutes);
app.use('/livros', livroRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});


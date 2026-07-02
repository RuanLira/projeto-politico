import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { z } from 'zod';

dotenv.config();

const app = express();
const port = Number(process.env.PORT ?? 3333);
const allowedOrigin = process.env.ALLOWED_ORIGIN ?? 'http://127.0.0.1:5173';

app.use(helmet());
app.use(cors({ origin: allowedOrigin }));
app.use(express.json({ limit: '256kb' }));

const authLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
});

const searchLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 40,
  standardHeaders: true,
  legacyHeaders: false,
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

app.get('/api/health', (_request, response) => {
  response.json({ ok: true, service: 'Controle Político API' });
});

app.post('/api/auth/login', authLimiter, (request, response) => {
  const parsed = loginSchema.safeParse(request.body);
  if (!parsed.success) {
    return response.status(400).json({ message: 'Dados de login inválidos.' });
  }

  if (parsed.data.email !== 'admin@controlepolitico.com' || parsed.data.password !== 'Admin123') {
    return response.status(401).json({ message: 'Credenciais inválidas.' });
  }

  return response.json({
    user: {
      id: 'auth-1',
      name: 'Ruan Lira',
      email: parsed.data.email,
      role: 'Administrador',
    },
  });
});

app.get('/api/search', searchLimiter, (request, response) => {
  const handle = String(request.query.handle ?? '').replace(/[<>{}$]/g, '').slice(0, 60);
  response.json({ handle, message: 'Ponto de acesso preparado para busca autorizada por APIs oficiais ou dados importados.' });
});

app.use((_request, response) => {
  response.status(404).json({ message: 'Rota não encontrada.' });
});

app.listen(port, () => {
  console.log(`Controle Político API rodando em http://127.0.0.1:${port}`);
});

import type { AppUser, Role } from '../types';
import { isStrongEnoughPassword, sanitizeInput } from '../utils/security';

const STORAGE_KEY = 'controle-politico-session';
const ATTEMPT_KEY = 'controle-politico-login-attempts';
const MAX_ATTEMPTS = 5;
const LOCK_MS = 60 * 1000;

const demoUsers: Array<AppUser & { password: string }> = [
  { id: 'auth-1', name: 'Ruan Lira', email: 'admin@controlepolitico.com', role: 'Admin', password: 'Admin123' },
  { id: 'auth-2', name: 'Equipe Comunicacao', email: 'comunicacao@controlepolitico.com', role: 'Comunicacao', password: 'Comunicacao123' },
  { id: 'auth-3', name: 'Consulta', email: 'consulta@controlepolitico.com', role: 'Consulta', password: 'Consulta123' },
];

interface AttemptState {
  count: number;
  lockedUntil: number;
}

function readAttempts(): AttemptState {
  const raw = localStorage.getItem(ATTEMPT_KEY);
  return raw ? JSON.parse(raw) : { count: 0, lockedUntil: 0 };
}

function writeAttempts(value: AttemptState) {
  localStorage.setItem(ATTEMPT_KEY, JSON.stringify(value));
}

export function getCurrentUser(): AppUser | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : null;
}

export async function login(email: string, password: string): Promise<AppUser> {
  await new Promise((resolve) => setTimeout(resolve, 550));
  const attempts = readAttempts();
  if (attempts.lockedUntil > Date.now()) {
    throw new Error('Muitas tentativas. Aguarde alguns instantes antes de tentar novamente.');
  }

  const cleanEmail = sanitizeInput(email).toLowerCase();
  if (!isStrongEnoughPassword(password)) {
    throw new Error('Use uma senha com ao menos 8 caracteres, uma letra maiuscula e um numero.');
  }

  const user = demoUsers.find((item) => item.email === cleanEmail && item.password === password);
  if (!user) {
    const nextCount = attempts.count + 1;
    writeAttempts({
      count: nextCount,
      lockedUntil: nextCount >= MAX_ATTEMPTS ? Date.now() + LOCK_MS : 0,
    });
    throw new Error('E-mail ou senha invalidos.');
  }

  writeAttempts({ count: 0, lockedUntil: 0 });
  const session: AppUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role as Role,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  return session;
}

export function logout() {
  localStorage.removeItem(STORAGE_KEY);
}

export async function requestPasswordReset(email: string) {
  await new Promise((resolve) => setTimeout(resolve, 450));
  if (!sanitizeInput(email).includes('@')) {
    throw new Error('Informe um e-mail valido.');
  }
  return true;
}

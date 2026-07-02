import { Lock, Mail, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { requestPasswordReset } from '../services/authService';
import { useAuth } from '../hooks/useAuth';

export function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('admin@controlepolitico.com');
  const [password, setPassword] = useState('Admin123');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    try {
      await login(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Nao foi possivel entrar.');
    } finally {
      setLoading(false);
    }
  }

  async function handleReset() {
    setLoading(true);
    setError('');
    setMessage('');
    try {
      await requestPasswordReset(email);
      setMessage('Instrucao de recuperacao enviada para o e-mail informado.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Nao foi possivel recuperar a senha.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login-page">
      <section className="login-hero">
        <div className="login-brand">
          <div className="brand-mark large">CP</div>
          <span>Controle Politico</span>
        </div>
        <h1>Painel de Engajamento Digital</h1>
        <p>Monitoramento organizado de interacoes publicas com governanca, permissoes e uso responsavel de dados.</p>
        <div className="responsible-box">
          <ShieldCheck size={20} />
          <span>Integracoes somente por APIs oficiais, OAuth ou importacao autorizada. Nunca solicitamos senha de redes sociais.</span>
        </div>
      </section>
      <section className="login-card">
        <span className="eyebrow">Acesso seguro</span>
        <h2>Entrar no painel</h2>
        <form onSubmit={handleLogin}>
          <label>
            E-mail
            <div className="input-with-icon">
              <Mail size={18} />
              <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required />
            </div>
          </label>
          <label>
            Senha
            <div className="input-with-icon">
              <Lock size={18} />
              <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" required />
            </div>
          </label>
          {error && <div className="alert error">{error}</div>}
          {message && <div className="alert success">{message}</div>}
          <button className="primary-button" disabled={loading}>
            {loading ? 'Validando...' : 'Entrar'}
          </button>
          <button type="button" className="link-button" onClick={handleReset} disabled={loading}>
            Recuperar senha
          </button>
        </form>
        <div className="demo-access">
          <strong>Acesso demonstrativo</strong>
          <span>admin@controlepolitico.com / Admin123</span>
        </div>
      </section>
    </main>
  );
}

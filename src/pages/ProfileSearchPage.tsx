import { Search } from 'lucide-react';
import { useState } from 'react';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';
import { DataTable } from '../components/DataTable';
import { LevelBadge } from '../components/LevelBadge';
import { getProfileDetails } from '../services/engagementService';
import { interactionLabel } from '../utils/scoring';
import { normalizeHandle } from '../utils/security';

export function ProfileSearchPage({ initialHandle }: { initialHandle?: string }) {
  const [handle, setHandle] = useState(initialHandle ?? '@ana.cidadania');
  const [searched, setSearched] = useState(initialHandle ?? '@ana.cidadania');
  const details = getProfileDetails(searched);

  return (
    <div className="page-stack">
      <form
        className="search-panel"
        onSubmit={(event) => {
          event.preventDefault();
          setSearched(normalizeHandle(handle));
        }}
      >
        <div>
          <span className="eyebrow">Consulta individual</span>
          <h2>Pesquisar perfil publico</h2>
        </div>
        <div className="search-box">
          <input value={handle} onChange={(event) => setHandle(event.target.value)} placeholder="@perfil" />
          <button className="primary-button fit">
            <Search size={18} />
            Consultar
          </button>
        </div>
      </form>

      {!details && <div className="alert error">Perfil nao encontrado nos dados simulados.</div>}

      {details?.profile && (
        <>
          <section className="profile-strip">
            <div className="avatar xl">{details.profile.name.slice(0, 2).toUpperCase()}</div>
            <div>
              <span className="eyebrow">{details.profile.city}</span>
              <h2>{details.profile.handle}</h2>
              <p>{details.profile.name} | {details.profile.followers.toLocaleString('pt-BR')} seguidores publicos</p>
            </div>
            <LevelBadge level={details.profile.level} />
            <strong className="score-large">{details.profile.score} pts</strong>
          </section>
          <section className="content-grid two">
            <article className="panel">
              <div className="panel-header">
                <h3>Evolucao por publicacao</h3>
              </div>
              <div className="chart-box">
                <ResponsiveContainer width="100%" height={260}>
                  <LineChart data={details.evolution}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#d9e2ef" />
                    <XAxis dataKey="publication" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="score" stroke="#246bfe" strokeWidth={3} dot={{ r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </article>
            <article className="panel">
              <div className="panel-header">
                <h3>Resumo de atividade</h3>
              </div>
              <div className="summary-grid">
                <span>Comentarios <strong>{details.profile.comments}</strong></span>
                <span>Curtidas <strong>{details.profile.likes}</strong></span>
                <span>Compart. <strong>{details.profile.shares}</strong></span>
                <span>Mencoes <strong>{details.profile.mentions}</strong></span>
              </div>
            </article>
          </section>
          <DataTable
            columns={['Data', 'Tipo', 'Publicacao', 'Registro publico']}
            rows={details.interactions.slice(0, 12).map((interaction) => [
              interaction.date,
              interactionLabel(interaction.type),
              interaction.publication?.title ?? '-',
              interaction.text ?? 'Interacao sem texto associado',
            ])}
          />
        </>
      )}
    </div>
  );
}

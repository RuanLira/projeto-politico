import { CalendarDays, Plus } from 'lucide-react';
import { useState } from 'react';
import { DataTable } from '../components/DataTable';
import { getPublicationMetrics } from '../services/engagementService';

export function PublicationsPage() {
  const [topic, setTopic] = useState('all');
  const metrics = getPublicationMetrics().filter((publication) => topic === 'all' || publication.topic === topic);
  const topics = Array.from(new Set(getPublicationMetrics().map((publication) => publication.topic)));

  return (
    <div className="page-stack">
      <div className="action-row">
        <div className="filters compact-filter">
          <select value={topic} onChange={(event) => setTopic(event.target.value)}>
            <option value="all">Todos os temas</option>
            {topics.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>
        <button className="primary-button fit">
          <Plus size={18} />
          Nova publicacao
        </button>
      </div>

      <div className="publication-grid">
        {metrics.map((publication) => (
          <article className="publication-card" key={publication.id}>
            <div className="publication-card-head">
              <span>{publication.platform}</span>
              <b>{publication.contentType}</b>
            </div>
            <h3>{publication.title}</h3>
            <p><CalendarDays size={16} /> {publication.date} | {publication.topic}</p>
            <div className="summary-grid">
              <span>Alcance <strong>{publication.reach.toLocaleString('pt-BR')}</strong></span>
              <span>Impressoes <strong>{publication.impressions.toLocaleString('pt-BR')}</strong></span>
              <span>Interacoes <strong>{publication.interactions}</strong></span>
              <span>Comentarios <strong>{publication.comments}</strong></span>
            </div>
            <div className="mini-list">
              <strong>Mais engajados</strong>
              {publication.topProfiles.slice(0, 3).map((profile) => (
                <span key={profile.id}>{profile.handle} - {profile.score} pts</span>
              ))}
            </div>
          </article>
        ))}
      </div>

      <DataTable
        columns={['Publicacao', 'Tipo', 'Data', 'Curtidas', 'Comentarios', 'Compart.', 'Mencoes']}
        rows={metrics.map((publication) => [
          publication.title,
          publication.contentType,
          publication.date,
          publication.likes,
          publication.comments,
          publication.shares,
          publication.mentions,
        ])}
      />
    </div>
  );
}

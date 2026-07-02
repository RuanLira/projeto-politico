import { Eye, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { DataTable } from '../components/DataTable';
import { Filters } from '../components/Filters';
import { LevelBadge } from '../components/LevelBadge';
import { publications } from '../data/mockData';
import { getEngagementProfiles, type EngagementFilters } from '../services/engagementService';
import { exportCsv } from '../utils/export';

export function RankingPage({
  filters,
  onFiltersChange,
  onOpenProfile,
}: {
  filters: EngagementFilters;
  onFiltersChange: (filters: EngagementFilters) => void;
  onOpenProfile: (handle: string) => void;
}) {
  const [loading, setLoading] = useState(false);
  const ranking = useMemo(() => getEngagementProfiles(filters), [filters]);

  function simulateRefresh() {
    setLoading(true);
    setTimeout(() => setLoading(false), 650);
  }

  return (
    <div className="page-stack">
      <Filters publications={publications} {...filters} onChange={(next) => onFiltersChange({ ...filters, ...next })} />
      <div className="action-row">
        <button className="secondary-button" onClick={simulateRefresh}>
          <Search size={18} />
          {loading ? 'Buscando...' : 'Atualizar busca'}
        </button>
        <button
          className="primary-button fit"
          onClick={() =>
            exportCsv(
              'ranking-engajamento.csv',
              ranking.map((profile) => ({
                handle: profile.handle,
                nome: profile.name,
                pontuacao: profile.score,
                classificacao: profile.level,
                comentarios: profile.comments,
                curtidas: profile.likes,
                compartilhamentos: profile.shares,
                mencoes: profile.mentions,
              })),
            )
          }
        >
          Exportar CSV
        </button>
      </div>
      <DataTable
        columns={['Perfil', 'Classificação', 'Pontuação', 'Comentários', 'Curtidas', 'Compart.', 'Menções', 'Detalhes']}
        rows={ranking.map((profile) => [
          <div className="identity-cell">
            <strong>{profile.handle}</strong>
            <span>{profile.name} - {profile.city}</span>
          </div>,
          <LevelBadge level={profile.level} />,
          profile.score,
          profile.comments,
          profile.likes,
          profile.shares,
          profile.mentions,
          <button className="icon-button" onClick={() => onOpenProfile(profile.handle)} title="Abrir detalhes">
            <Eye size={18} />
          </button>,
        ])}
      />
    </div>
  );
}

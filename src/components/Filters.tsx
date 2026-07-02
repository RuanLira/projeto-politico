import type { InteractionType, Publication } from '../types';

export function Filters({
  query,
  type,
  publicationId,
  startDate,
  endDate,
  publications,
  onChange,
}: {
  query?: string;
  type?: InteractionType | 'all';
  publicationId?: string;
  startDate?: string;
  endDate?: string;
  publications: Publication[];
  onChange: (filters: Record<string, string>) => void;
}) {
  return (
    <div className="filters">
      <input value={query ?? ''} onChange={(event) => onChange({ query: event.target.value })} placeholder="Buscar por @" />
      <select value={type ?? 'all'} onChange={(event) => onChange({ type: event.target.value })}>
        <option value="all">Todas as interações</option>
        <option value="curtida">Curtidas</option>
        <option value="comentário">Comentários</option>
        <option value="compartilhamento">Compartilhamentos</option>
        <option value="menção">Menções</option>
      </select>
      <select value={publicationId ?? 'all'} onChange={(event) => onChange({ publicationId: event.target.value })}>
        <option value="all">Todas as publicações</option>
        {publications.map((publication) => (
          <option key={publication.id} value={publication.id}>
            {publication.title}
          </option>
        ))}
      </select>
      <input type="date" value={startDate ?? ''} onChange={(event) => onChange({ startDate: event.target.value })} />
      <input type="date" value={endDate ?? ''} onChange={(event) => onChange({ endDate: event.target.value })} />
    </div>
  );
}

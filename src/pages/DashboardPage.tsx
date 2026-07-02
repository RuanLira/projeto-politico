import { BarChart3, MessageCircle, Target, TrendingUp, Users } from 'lucide-react';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Filters } from '../components/Filters';
import { LevelBadge } from '../components/LevelBadge';
import { MetricCard } from '../components/MetricCard';
import { engagementByPeriod, politician, publications } from '../data/mockData';
import { getPainelMetrics, type EngagementFilters } from '../services/engagementService';

export function PainelPage({
  filters,
  onFiltersChange,
}: {
  filters: EngagementFilters;
  onFiltersChange: (filters: EngagementFilters) => void;
}) {
  const metrics = getPainelMetrics(filters);

  return (
    <div className="page-stack">
      <section className="profile-strip">
        <div className="avatar xl">{politician.avatar}</div>
        <div>
          <span className="eyebrow">{politician.office} - {politician.party}</span>
          <h2>{politician.name}</h2>
          <p>{politician.region} | acompanhamento ético de interações públicas</p>
        </div>
      </section>

      <Filters publications={publications} {...filters} onChange={(next) => onFiltersChange({ ...filters, ...next })} />

      <section className="metrics-grid">
        <MetricCard label="Perfis monitorados" value={metrics.monitoredProfiles} trend="+12% no período" icon={Users} />
        <MetricCard label="Interações" value={metrics.totalInteractions} trend="Dados simulados" icon={MessageCircle} tone="green" />
        <MetricCard label="Muito ativos" value={metrics.highlyActive} trend="Prioridade estratégica" icon={Target} tone="gold" />
        <MetricCard label="Pontuação média" value={metrics.averageScore} trend="Pontuação ponderada" icon={TrendingUp} />
      </section>

      <section className="content-grid two">
        <article className="panel">
          <div className="panel-header">
            <div>
              <span className="eyebrow">Período</span>
              <h3>Engajamento por semana</h3>
            </div>
            <BarChart3 size={22} />
          </div>
          <div className="chart-box">
            <ResponsiveContainer width="100%" height={290}>
              <AreaChart data={engagementByPeriod}>
                <CartesianGrid strokeDasharray="3 3" stroke="#d9e2ef" />
                <XAxis dataKey="period" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Area type="monotone" dataKey="curtidas" stackId="1" stroke="#246bfe" fill="#246bfe" fillOpacity={0.18} />
                <Area type="monotone" dataKey="comentarios" stackId="1" stroke="#12a594" fill="#12a594" fillOpacity={0.2} />
                <Area type="monotone" dataKey="compartilhamentos" stackId="1" stroke="#c89419" fill="#c89419" fillOpacity={0.22} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </article>
        <article className="panel">
          <div className="panel-header">
            <div>
              <span className="eyebrow">Ranking</span>
              <h3>Perfis mais ativos</h3>
            </div>
          </div>
          <div className="ranking-list">
            {metrics.ranking.map((profile, index) => (
              <div className="ranking-row" key={profile.id}>
                <strong>#{index + 1}</strong>
                <div>
                  <span>{profile.handle}</span>
                  <small>{profile.name}</small>
                </div>
                <LevelBadge level={profile.level} />
                <b>{profile.score}</b>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="panel">
        <div className="panel-header">
          <h3>Distribuição de interações</h3>
        </div>
        <div className="chart-box compact">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={engagementByPeriod}>
              <CartesianGrid strokeDasharray="3 3" stroke="#d9e2ef" />
              <XAxis dataKey="period" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="comentarios" fill="#0f3b63" radius={[6, 6, 0, 0]} />
              <Bar dataKey="mencoes" fill="#12a594" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}

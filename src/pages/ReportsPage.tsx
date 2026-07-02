import { Download, FileDown } from 'lucide-react';
import { useState } from 'react';
import { DataTable } from '../components/DataTable';
import { getEngagementProfiles, getPublicationMetrics } from '../services/engagementService';
import { exportCsv, exportPdf } from '../utils/export';

export function ReportsPage() {
  const [period, setPeriod] = useState('2026-06');
  const ranking = getEngagementProfiles();
  const publications = getPublicationMetrics();
  const bestPublication = [...publications].sort((a, b) => b.interactions - a.interactions)[0];
  const strategicProfiles = ranking.filter((profile) => profile.level === 'Muito ativo').slice(0, 5);

  return (
    <div className="page-stack">
      <section className="report-header">
        <div>
          <span className="eyebrow">Resumo executivo</span>
          <h2>Relatorio de engajamento</h2>
          <p>Dados simulados para validacao do MVP, com exportacao operacional e indicadores de tendencia.</p>
        </div>
        <div className="report-actions">
          <input type="month" value={period} onChange={(event) => setPeriod(event.target.value)} />
          <button
            className="secondary-button"
            onClick={() =>
              exportCsv(
                'relatorio-engajamento.csv',
                ranking.map((profile) => ({
                  periodo: period,
                  handle: profile.handle,
                  pontuacao: profile.score,
                  classificacao: profile.level,
                })),
              )
            }
          >
            <Download size={18} />
            CSV
          </button>
          <button className="primary-button fit" onClick={exportPdf}>
            <FileDown size={18} />
            PDF
          </button>
        </div>
      </section>

      <section className="insight-grid">
        <article className="insight-card">
          <span>Seguidores mais ativos</span>
          <strong>{strategicProfiles.map((profile) => profile.handle).join(', ')}</strong>
        </article>
        <article className="insight-card positive">
          <span>Tendencia de engajamento</span>
          <strong>+18% em comentarios e mencoes qualificadas</strong>
        </article>
        <article className="insight-card gold">
          <span>Melhor publicacao</span>
          <strong>{bestPublication.title}</strong>
        </article>
        <article className="insight-card">
          <span>Perfis estrategicos</span>
          <strong>{strategicProfiles.length} perfis com atividade muito alta</strong>
        </article>
      </section>

      <DataTable
        columns={['Indicador', 'Resultado', 'Leitura']}
        rows={[
          ['Volume total', ranking.reduce((total, profile) => total + profile.likes + profile.comments + profile.shares + profile.mentions, 0), 'Base publica importada/autorizada'],
          ['Aumento de engajamento', '+18%', 'Comparacao simulada com periodo anterior'],
          ['Publicacoes de destaque', bestPublication.title, `${bestPublication.interactions} interacoes`],
          ['Atencao operacional', '2 perfis com queda de frequencia', 'Reavaliar temas e horarios'],
        ]}
      />
    </div>
  );
}

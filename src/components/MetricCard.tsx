import type { LucideIcon } from 'lucide-react';

export function MetricCard({
  label,
  value,
  trend,
  icon: Icon,
  tone = 'blue',
}: {
  label: string;
  value: string | number;
  trend?: string;
  icon: LucideIcon;
  tone?: 'blue' | 'green' | 'gold';
}) {
  return (
    <article className={`metric-card ${tone}`}>
      <div className="metric-icon">
        <Icon size={22} />
      </div>
      <span>{label}</span>
      <strong>{value}</strong>
      {trend && <small>{trend}</small>}
    </article>
  );
}

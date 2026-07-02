import type { ActivityLevel } from '../types';

export function LevelBadge({ level }: { level: ActivityLevel }) {
  const className = `level-badge ${level.toLowerCase().replace(' ', '-')}`;
  return <span className={className}>{level}</span>;
}

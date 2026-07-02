import type { ActivityLevel, Interaction, InteractionType } from '../types';

export const SCORE_RULES: Record<InteractionType, number> = {
  curtida: 1,
  comentário: 3,
  compartilhamento: 5,
  menção: 4,
};

export const RECURRENCE_BONUS = 10;
export const RECURRENCE_THRESHOLD = 5;

export function calculateInteractionScore(interactions: Interaction[]) {
  const baseScore = interactions.reduce((total, interaction) => total + SCORE_RULES[interaction.type], 0);
  const recurrenceBonus = interactions.length >= RECURRENCE_THRESHOLD ? RECURRENCE_BONUS : 0;
  return {
    baseScore,
    recurrenceBonus,
    score: baseScore + recurrenceBonus,
  };
}

export function classifyActivity(score: number): ActivityLevel {
  if (score <= 10) return 'Inativo';
  if (score <= 30) return 'Pouco ativo';
  if (score <= 70) return 'Ativo';
  return 'Muito ativo';
}

export function interactionLabel(type: InteractionType) {
  const labels: Record<InteractionType, string> = {
    curtida: 'Curtida',
    comentário: 'Comentário',
    compartilhamento: 'Compartilhamento',
    menção: 'Menção',
  };
  return labels[type];
}

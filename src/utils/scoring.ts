import type { ActivityLevel, Interaction, InteractionType } from '../types';

export const SCORE_RULES: Record<InteractionType, number> = {
  like: 1,
  comment: 3,
  share: 5,
  mention: 4,
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
    like: 'Curtida',
    comment: 'Comentario',
    share: 'Compartilhamento',
    mention: 'Mencao',
  };
  return labels[type];
}

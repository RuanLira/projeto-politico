import { interactions, publicProfiles, publications } from '../data/mockData';
import type { EngagementProfile, InteractionType, Publication } from '../types';
import { calculateInteractionScore, classifyActivity } from '../utils/scoring';
import { normalizeHandle } from '../utils/security';

export interface EngagementFilters {
  query?: string;
  type?: InteractionType | 'all';
  publicationId?: string;
  startDate?: string;
  endDate?: string;
}

function filteredInteractions(filters: EngagementFilters = {}) {
  return interactions.filter((interaction) => {
    const publication = publications.find((item) => item.id === interaction.publicationId);
    if (filters.type && filters.type !== 'all' && interaction.type !== filters.type) return false;
    if (filters.publicationId && filters.publicationId !== 'all' && interaction.publicationId !== filters.publicationId) return false;
    if (filters.startDate && interaction.date < filters.startDate) return false;
    if (filters.endDate && interaction.date > filters.endDate) return false;
    if (filters.query) {
      const profile = publicProfiles.find((item) => item.id === interaction.profileId);
      const query = normalizeHandle(filters.query);
      if (!profile?.handle.toLowerCase().includes(query.replace('@', ''))) return false;
    }
    return Boolean(publication);
  });
}

export function getEngagementProfiles(filters: EngagementFilters = {}): EngagementProfile[] {
  const scopedInteractions = filteredInteractions(filters);
  return publicProfiles
    .map((profile) => {
      const profileInteractions = scopedInteractions.filter((interaction) => interaction.profileId === profile.id);
      const { score, recurrenceBonus } = calculateInteractionScore(profileInteractions);
      return {
        ...profile,
        likes: profileInteractions.filter((interaction) => interaction.type === 'curtida').length,
        comments: profileInteractions.filter((interaction) => interaction.type === 'comentário').length,
        shares: profileInteractions.filter((interaction) => interaction.type === 'compartilhamento').length,
        mentions: profileInteractions.filter((interaction) => interaction.type === 'menção').length,
        recurrenceBonus,
        score,
        level: classifyActivity(score),
        lastInteraction: profileInteractions.map((interaction) => interaction.date).sort().slice(-1)[0] ?? '-',
      };
    })
    .filter((profile) => !filters.query || profile.handle.toLowerCase().includes(normalizeHandle(filters.query).replace('@', '')))
    .sort((a, b) => b.score - a.score);
}

export function getProfileDetails(handle: string) {
  const normalized = normalizeHandle(handle);
  const profile = publicProfiles.find((item) => item.handle.toLowerCase() === normalized);
  if (!profile) return null;
  const rankingProfile = getEngagementProfiles().find((item) => item.id === profile.id);
  const profileInteractions = interactions
    .filter((interaction) => interaction.profileId === profile.id)
    .map((interaction) => ({
      ...interaction,
      publication: publications.find((publication) => publication.id === interaction.publicationId),
    }))
    .sort((a, b) => b.date.localeCompare(a.date));

  const evolution = publications.map((publication) => ({
    publication: publication.title.slice(0, 18),
    score: calculateInteractionScore(profileInteractions.filter((interaction) => interaction.publicationId === publication.id)).score,
  }));

  return { profile: rankingProfile, interactions: profileInteractions, evolution };
}

export function getPublicationMetrics() {
  return publications.map((publication: Publication) => {
    const publicationInteractions = interactions.filter((interaction) => interaction.publicationId === publication.id);
    const topProfiles = getEngagementProfiles({ publicationId: publication.id }).slice(0, 5);
    return {
      ...publication,
      interactions: publicationInteractions.length,
      comments: publicationInteractions.filter((interaction) => interaction.type === 'comentário').length,
      likes: publicationInteractions.filter((interaction) => interaction.type === 'curtida').length,
      shares: publicationInteractions.filter((interaction) => interaction.type === 'compartilhamento').length,
      mentions: publicationInteractions.filter((interaction) => interaction.type === 'menção').length,
      topProfiles,
    };
  });
}

export function getPainelMetrics(filters: EngagementFilters = {}) {
  const scopedInteractions = filteredInteractions(filters);
  const ranking = getEngagementProfiles(filters);
  return {
    monitoredProfiles: publicProfiles.length,
    totalInteractions: scopedInteractions.length,
    highlyActive: ranking.filter((profile) => profile.level === 'Muito ativo').length,
    averageScore: Math.round(ranking.reduce((total, profile) => total + profile.score, 0) / ranking.length),
    ranking: ranking.slice(0, 8),
  };
}

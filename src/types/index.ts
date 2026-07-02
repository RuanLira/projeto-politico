export type Role = 'Admin' | 'Gabinete' | 'Comunicacao' | 'Consulta';

export type InteractionType = 'like' | 'comment' | 'share' | 'mention';

export type ActivityLevel = 'Inativo' | 'Pouco ativo' | 'Ativo' | 'Muito ativo';

export interface Politician {
  id: string;
  name: string;
  office: string;
  party: string;
  region: string;
  avatar: string;
}

export interface PublicProfile {
  id: string;
  handle: string;
  name: string;
  city: string;
  verified: boolean;
  followers: number;
  tags: string[];
}

export interface Publication {
  id: string;
  title: string;
  platform: 'Instagram' | 'Facebook' | 'X' | 'TikTok';
  contentType: 'Video' | 'Imagem' | 'Carrossel' | 'Texto';
  date: string;
  reach: number;
  impressions: number;
  topic: string;
}

export interface Interaction {
  id: string;
  profileId: string;
  publicationId: string;
  type: InteractionType;
  date: string;
  text?: string;
}

export interface TeamUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: 'Ativo' | 'Pendente' | 'Bloqueado';
  lastAccess: string;
}

export interface AuditLog {
  id: string;
  user: string;
  action: string;
  target: string;
  date: string;
  severity: 'info' | 'warning' | 'success';
}

export interface EngagementProfile extends PublicProfile {
  likes: number;
  comments: number;
  shares: number;
  mentions: number;
  recurrenceBonus: number;
  score: number;
  level: ActivityLevel;
  lastInteraction: string;
}

export interface AppUser {
  id: string;
  name: string;
  email: string;
  role: Role;
}

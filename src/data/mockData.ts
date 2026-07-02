import type { AuditLog, Interaction, Politician, PublicProfile, Publication, TeamUser } from '../types';

export const politician: Politician = {
  id: 'pol-1',
  name: 'Marina Albuquerque',
  office: 'Deputada Federal',
  party: 'PSD',
  region: 'Sao Paulo',
  avatar: 'MA',
};

export const publications: Publication[] = [
  {
    id: 'pub-1',
    title: 'Prestacao de contas do primeiro semestre',
    platform: 'Instagram',
    contentType: 'Carrossel',
    date: '2026-06-04',
    reach: 84200,
    impressions: 127500,
    topic: 'Transparencia',
  },
  {
    id: 'pub-2',
    title: 'Visita tecnica ao Hospital Municipal',
    platform: 'Instagram',
    contentType: 'Video',
    date: '2026-06-11',
    reach: 95300,
    impressions: 148900,
    topic: 'Saude',
  },
  {
    id: 'pub-3',
    title: 'Projeto de conectividade nas escolas',
    platform: 'Facebook',
    contentType: 'Imagem',
    date: '2026-06-18',
    reach: 57800,
    impressions: 81200,
    topic: 'Educacao',
  },
  {
    id: 'pub-4',
    title: 'Audiencia publica sobre mobilidade',
    platform: 'X',
    contentType: 'Texto',
    date: '2026-06-23',
    reach: 43800,
    impressions: 69300,
    topic: 'Mobilidade',
  },
  {
    id: 'pub-5',
    title: 'Resumo semanal do gabinete',
    platform: 'Instagram',
    contentType: 'Video',
    date: '2026-06-29',
    reach: 102400,
    impressions: 169000,
    topic: 'Mandato',
  },
];

const names = [
  ['@ana.cidadania', 'Ana Torres', 'Campinas'],
  ['@bruno_educa', 'Bruno Lima', 'Santos'],
  ['@carla_saude', 'Carla Nunes', 'Sao Paulo'],
  ['@diegoambiental', 'Diego Prado', 'Sorocaba'],
  ['@elisa_mobilidade', 'Elisa Rocha', 'Osasco'],
  ['@fernando.sp', 'Fernando Melo', 'Guarulhos'],
  ['@giovana_comunica', 'Giovana Sales', 'Sao Bernardo'],
  ['@heitorlocal', 'Heitor Ramos', 'Jundiai'],
  ['@inesparticipa', 'Ines Vieira', 'Ribeirao Preto'],
  ['@joao_bairro', 'Joao Martins', 'Sao Paulo'],
  ['@karina_causa', 'Karina Costa', 'Diadema'],
  ['@lucas_transparente', 'Lucas Dias', 'Barueri'],
  ['@marcia_popular', 'Marcia Freitas', 'Maua'],
  ['@nando_agenda', 'Nando Silva', 'Sao Caetano'],
  ['@olivia_digital', 'Olivia Pires', 'Cotia'],
  ['@paulo_comunidade', 'Paulo Ferraz', 'Taboao'],
  ['@quel_vozativa', 'Raquel Souza', 'Embu'],
  ['@renato_sp', 'Renato Azevedo', 'Praia Grande'],
  ['@sandra_escola', 'Sandra Lopes', 'Bauru'],
  ['@thiago_atento', 'Thiago Gomes', 'Marilia'],
  ['@ursula_cultura', 'Ursula Teixeira', 'Sao Paulo'],
  ['@victor_cidade', 'Victor Andrade', 'ABC Paulista'],
  ['@wanda_saopaulo', 'Wanda Batista', 'Santo Andre'],
  ['@xavier_publico', 'Xavier Reis', 'Carapicuiba'],
  ['@yasmin_saude', 'Yasmin Cardoso', 'Sao Vicente'],
  ['@zeca_mandato', 'Zeca Oliveira', 'Limeira'],
  ['@aline_moradia', 'Aline Campos', 'Itaqua'],
  ['@benicio_civico', 'Benicio Duarte', 'Franca'],
  ['@clara_fiscaliza', 'Clara Moreira', 'Suzano'],
  ['@daniel_participa', 'Daniel Matos', 'Taubate'],
];

export const publicProfiles: PublicProfile[] = names.map(([handle, name, city], index) => ({
  id: `profile-${index + 1}`,
  handle,
  name,
  city,
  verified: index % 9 === 0,
  followers: 800 + index * 347,
  tags: index % 3 === 0 ? ['lideranca local', 'recorrente'] : index % 3 === 1 ? ['educacao'] : ['saude'],
}));

const interactionTypes = ['like', 'comment', 'share', 'mention'] as const;

export const interactions: Interaction[] = publicProfiles.flatMap((profile, profileIndex) => {
  const count = profileIndex < 6 ? 12 - profileIndex : profileIndex < 15 ? 7 : profileIndex < 24 ? 4 : 1;
  return Array.from({ length: count }).map((_, interactionIndex) => ({
    id: `int-${profileIndex + 1}-${interactionIndex + 1}`,
    profileId: profile.id,
    publicationId: publications[(profileIndex + interactionIndex) % publications.length].id,
    type: interactionTypes[(profileIndex + interactionIndex) % interactionTypes.length],
    date: `2026-06-${String(2 + ((profileIndex + interactionIndex * 3) % 28)).padStart(2, '0')}`,
    text:
      interactionIndex % 3 === 0
        ? 'Interacao publica registrada em conteudo do mandato.'
        : undefined,
  }));
});

export const teamUsers: TeamUser[] = [
  { id: 'user-1', name: 'Ruan Lira', email: 'admin@controlepolitico.com', role: 'Admin', status: 'Ativo', lastAccess: '2026-07-02 09:12' },
  { id: 'user-2', name: 'Camila Rocha', email: 'gabinete@controlepolitico.com', role: 'Gabinete', status: 'Ativo', lastAccess: '2026-07-01 18:44' },
  { id: 'user-3', name: 'Felipe Maia', email: 'comunicacao@controlepolitico.com', role: 'Comunicacao', status: 'Ativo', lastAccess: '2026-07-02 08:33' },
  { id: 'user-4', name: 'Livia Costa', email: 'consulta@controlepolitico.com', role: 'Consulta', status: 'Pendente', lastAccess: '-' },
];

export const auditLogs: AuditLog[] = [
  { id: 'log-1', user: 'Ruan Lira', action: 'Gerou relatorio mensal', target: 'Relatorios', date: '2026-07-02 09:22', severity: 'success' },
  { id: 'log-2', user: 'Camila Rocha', action: 'Editou permissao de usuario', target: 'Equipe', date: '2026-07-01 17:18', severity: 'warning' },
  { id: 'log-3', user: 'Felipe Maia', action: 'Exportou ranking em CSV', target: 'Ranking', date: '2026-07-01 15:03', severity: 'info' },
  { id: 'log-4', user: 'Sistema', action: 'Bloqueou tentativa excessiva de login', target: 'Autenticacao', date: '2026-06-30 21:46', severity: 'warning' },
];

export const engagementByPeriod = [
  { period: '01-07 Jun', curtidas: 620, comentarios: 210, compartilhamentos: 78, mencoes: 44 },
  { period: '08-14 Jun', curtidas: 720, comentarios: 260, compartilhamentos: 92, mencoes: 58 },
  { period: '15-21 Jun', curtidas: 680, comentarios: 236, compartilhamentos: 81, mencoes: 51 },
  { period: '22-28 Jun', curtidas: 810, comentarios: 318, compartilhamentos: 126, mencoes: 67 },
  { period: '29 Jun-02 Jul', curtidas: 450, comentarios: 172, compartilhamentos: 64, mencoes: 39 },
];

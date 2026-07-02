# Controle Politico / Painel de Engajamento Digital

MVP web para politicos, gabinetes e equipes de comunicacao acompanharem engajamento publico de forma organizada, segura e etica.

## O que ja esta pronto

- Login demonstrativo com limite de tentativas e recuperacao simulada.
- Dashboard com metricas, filtros, ranking e graficos.
- Ranking de engajamento com pontuacao por curtidas, comentarios, compartilhamentos, mencoes e bonus de recorrencia.
- Consulta individual por `@perfil`.
- Publicacoes com metricas e perfis mais engajados.
- Relatorios com resumo executivo, exportacao CSV e impressao/salvamento em PDF.
- Administracao com usuarios, papeis e logs.
- Configuracoes de gabinete, identidade visual, integracoes autorizadas e aviso de uso responsavel.
- Backend Express inicial com Helmet, CORS, validacao Zod e rate limit.

## Regras de pontuacao

As regras ficam em `src/utils/scoring.ts`:

- Curtida: 1 ponto
- Comentario: 3 pontos
- Compartilhamento: 5 pontos
- Mencao: 4 pontos
- Frequencia recorrente: bonus de 10 pontos

Classificacao:

- 0 a 10: Inativo
- 11 a 30: Pouco ativo
- 31 a 70: Ativo
- 71+: Muito ativo

## Instalacao

```bash
npm install
```

## Execucao

Front-end:

```bash
npm run dev
```

API mockada:

```bash
npm run api
```

Build de producao:

```bash
npm run build
```

## Acesso demonstrativo

- E-mail: `admin@controlepolitico.com`
- Senha: `Admin123`

## Variaveis de ambiente

Copie `.env.example` para `.env` e ajuste:

```bash
VITE_APP_NAME="Controle Politico"
VITE_API_URL="http://127.0.0.1:3333"
JWT_SECRET="troque-este-segredo-em-producao"
ALLOWED_ORIGIN="http://127.0.0.1:5173"
```

## Seguranca e uso responsavel

Este MVP nao solicita senha do Instagram ou de qualquer rede social, nao faz scraping abusivo e nao automatiza login. Integracoes futuras devem usar APIs oficiais, OAuth ou importacao manual/autorizada.

Para evoluir para produto comercial:

- Substituir autenticao local por Supabase Auth, Firebase Auth ou NextAuth.
- Persistir dados em PostgreSQL/Supabase/Firebase.
- Implementar RBAC no backend, nao apenas no front-end.
- Adicionar logs imutaveis para acoes administrativas.
- Configurar CSRF conforme a estrategia de sessao escolhida.
- Usar secrets apenas no servidor.
- Criar politica de privacidade e termos revisados juridicamente.
